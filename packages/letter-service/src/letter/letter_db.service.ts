import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LetterState } from '../../../../shared/entities/letter_state.entity'; // 실제 경로로 변경
import { UserState } from '../../../../shared/entities/user_state.entity'; // 실제 경로로 변경
import { Letter } from '../../../../shared/entities/letter.entity';

@Injectable()
export class LetterDbService {
  constructor(
    @InjectRepository(LetterState)
    private readonly letterStateRepository: Repository<LetterState>,
    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,
    @InjectRepository(Letter)
    private readonly letterRepository: Repository<Letter>,
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
