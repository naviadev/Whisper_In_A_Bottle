import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LetterState } from './entities/letter-state.entity'; // 실제 경로로 변경
import { UserState } from './entities/user-state.entity'; // 실제 경로로 변경
import { Letter } from './entities/letter.entity';

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
  async getUserWithLongestReceiveTime(
    excludeUserId: string,
  ): Promise<UserState> {
    const subQuery = this.letterStateRepository
      .createQueryBuilder('letter_state')
      .select('receiverId');

    const user = await this.userStateRepository
      .createQueryBuilder('user')
      .where(`user.userId NOT IN (${subQuery.getQuery()})`)
      .andWhere('user.userId != :excludeUserId', { excludeUserId })
      .orderBy('user.receiveTime', 'DESC')
      .getOne();

    return user;
  }

  //* 편지 저장하기
  async saveLetter(body: string): Promise<Letter> {
    const letter = new Letter();
    letter.content = body;

    return await this.letterRepository.save(letter);
  }

  //* 편지 상태 저장하기
  async saveLetterState(
    letterId: number,
    senderId: string,
    receiverId: string,
    sendTime: number,
  ) {
    const letterState = new LetterState();
    letterState.letterId = letterId;
    letterState.receiverId = senderId;
    letterState.senderId = receiverId;
    letterState.sendTime = sendTime;

    return await this.letterStateRepository.save(letterState);
  }

  async deleteLetterState(letterId: number) {
    return await this.letterStateRepository.delete({ letterId });
  }
}
