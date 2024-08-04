import { Injectable } from '@nestjs/common';
import { SenderLetterDto } from './dto/letter.dto';
import { LetterDbService } from './letter-db.service';

@Injectable()
export class LetterLogicService {
  constructor(private readonly letterDbService: LetterDbService) {}

  //* 유저가 보낸 편지를 랜덤 유저를 선정 후, LetterState 형태로 저장한다.
  async saveAndAssignLetter(userId: string, letter: SenderLetterDto) {
    // TODO: 편지 저장
    const letterEntity = await this.letterDbService.saveLetter(letter.content);

    // TODO: RandomPlayer 선정
    const selectUser =
      await this.letterDbService.getUserWithLongestReceiveTime(userId);

    if (selectUser === null) {
      return;
    }

    // TODO: IP 비교 핑차이로
    //! 현재는 임시로 시간을 지정했다.
    const currentTime = new Date().getTime();
    const addTime = 500; //* 임시로 설정한 시간 차이

    // TODO: LetterState에 저장
    return await this.letterDbService.saveLetterState(
      letterEntity.letterId,
      userId,
      selectUser.userId,
      currentTime + addTime,
    );
  }

  //* letterId를 이용하여 편지를 찾는다.
  searchLetter(letterId: number) {
    return this.letterDbService.getLetter(letterId);
  }

  //* 유저 Id를 이용하여 LetterState 값을 찾는다.
  searchLetterState(userId: string) {
    return this.letterDbService.getLetterUsingUserId(userId);
  }
}
