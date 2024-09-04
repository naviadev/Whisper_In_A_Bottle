import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { LetterState } from '../../../../shared/entities/letter_state.entity'; // 실제 경로로 변경
import { UserState } from '../../../../shared/entities/user_state.entity'; // 실제 경로로 변경
import { Letter } from '../../../../shared/entities/letter.entity';
import { LetterInfo } from '../../../../shared/entities/letter_info.entity';
import { LetterSave } from '../../../../shared/entities/letter_save.entitiy';
import { LETTER_CONFIG, LETTER_ERR } from './config/letter.enum';

@Injectable()
export class LetterDbService {
  constructor(
    @InjectRepository(LetterState)
    private readonly letterStateRepository: Repository<LetterState>,
    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,
    @InjectRepository(Letter)
    private readonly letterRepository: Repository<Letter>,
    @InjectRepository(LetterInfo)
    private readonly letterInfoRepository: Repository<LetterInfo>,
    @InjectRepository(LetterSave)
    private readonly letterSaveRepository: Repository<LetterSave>,
  ) {}

  //* 편지를 받지 못하는 사용자 찾기.
  getUserWithLongestReceiveTime(excludeid: string): Promise<UserState | null> {
    const subQuery = this.letterStateRepository
      .createQueryBuilder('letter_state')
      .select('receiver_id');

    return this.userStateRepository
      .createQueryBuilder('user')
      .where(`user.id NOT IN (${subQuery.getQuery()})`)
      .andWhere('user.id != :excludeid', { excludeid })
      .orderBy('user.receive_time', 'DESC')
      .getOne();
  }

  //* 편지 저장하기
  saveLetter(body: string): Promise<Letter> {
    const letter = new Letter();
    letter.content = body;
    return this.letterRepository.save(letter);
  }

  saveLetterInfo(user_id: string, letter: Letter): Promise<LetterInfo> {
    const letterInfo = this.letterInfoRepository.create({
      letter_id: letter.letter_id,
      user_id: user_id,
      time: new Date(),
      is_send: false,
    });

    return this.letterInfoRepository.save(letterInfo);
  }

  //* LetterSave Enitity 저장
  saveLetterSave(user_id: string, letter_id: number): Promise<LetterSave> {
    try {
      const letterSave = this.letterSaveRepository.create({
        user_id,
        letter_id,
      });
      return this.letterSaveRepository.save(letterSave);
    } catch (error) {
      throw new InternalServerErrorException(
        LETTER_ERR.SAVE_FAIL_LETTERSAVE_ERR_MSG,
      );
    }
  }

  /**
   * * LetterSave의 데이터를 정렬하여 삭제하는 로직입니다.
   * * 데이터 생성 시 자동으로 생성된 날짜가 저장되는 create_at을 이용해 데이터를 정렬 후,
   * * 오래된 날짜부터 삭제합니다.
   * @param user_id : 검색할 유저 ID
   * @returns : void | 삭제 결과
   */
  async checkMaxLetterSaveCount(user_id: string): Promise<DeleteResult | void> {
    //* 생성된 수로 데이터를 찾아 정렬한다.

    try {
      const records = await this.letterSaveRepository.find({
        where: { user_id },
        order: { created_at: 'ASC' },
      });

      //* 데이터가 최대 10개 되도록 오래된 데이터부터 삭제한다. (이미 정렬이된 상태)
      if (records.length > LETTER_CONFIG.MAX_SAVE_COUNT) {
        const recordsToDelete = records.slice(
          0,
          records.length - LETTER_CONFIG.MAX_SAVE_COUNT,
        );
        const idsToDelete = recordsToDelete.map((record) => record.id);
        return await this.letterSaveRepository.delete(idsToDelete);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        LETTER_ERR.CHECK_FAIL_COUNT_LETTERSAVE_ERR_MSG,
      );
    }
  }

  //* 가장 오래된 편지를 반환받는다.
  getOlderUnsentLetter() {
    const letterInfo = this.letterInfoRepository
      .createQueryBuilder('letterinfo')
      .where('letterinfo.is_send = :isSend', { isSend: false })
      .orderBy('letterinfo.time', 'ASC')
      .getOne();

    return letterInfo;
  }

  //* 편지 Id를 통해 is_send를 true로 업데이트한다.
  letterUpdateIsSendIntoTrue(letterId: number) {
    return this.letterInfoRepository
      .createQueryBuilder()
      .update(LetterInfo)
      .set({ is_send: true })
      .where('letter_id = :letterId', { letterId })
      .execute();
  }

  //* 편지 상태 저장하기
  saveLetterState(
    letterId: number,
    senderId: string,
    receiverId: string,
    sendTime: number,
  ): Promise<LetterState> {
    const letterState = new LetterState();
    letterState.letter_id = letterId;
    letterState.receiver_id = receiverId;
    letterState.sender_id = senderId;
    letterState.send_time = sendTime;

    return this.letterStateRepository.save(letterState);
  }

  deleteLetterState(letterId: number) {
    return this.letterStateRepository.delete({ letter_id: letterId });
  }

  getLetter(letterId: number): Promise<Letter> {
    return this.letterRepository.findOne({ where: { letter_id: letterId } });
  }

  getLetterUsingid(receiverId: string): Promise<LetterState | null> {
    return this.letterStateRepository.findOne({
      where: { receiver_id: receiverId },
    });
  }
}
