import { Injectable } from '@nestjs/common';
import { SenderLetterDTO } from '../../../../shared/dtos/letter.dto';
import { LetterDbService } from './letter_db.service';
import { LetterState } from '../../../../shared/entities/letter_state.entity';

@Injectable()
export class LetterLogicService {
  constructor(private readonly letterDbService: LetterDbService) {}

  //* 유저가 보낸 편지를 랜덤 유저를 선정 후, LetterState 형태로 저장한다.
  async saveAndAssignLetter(id: string, letter: SenderLetterDTO) {
    // TODO: 편지 저장
    const letterEnitity = await this.letterDbService.saveLetter(letter.content);
    await this.letterDbService.saveLetterInfo(id, letterEnitity);

    // TODO: RandomPlayer 선정
    const selectUser =
      await this.letterDbService.getUserWithLongestReceiveTime(id);

    // TODO: 선정실패 X
    if (selectUser === null) {
      return;
    }

    return this.SendLetter(selectUser.id);
  }

  async SendLetter(sendUserId: string): Promise<LetterState> {
    //* 편지를 가져온다. 가장 오래된 편지
    const letterEntity = await this.letterDbService.getOlderUnsentLetter();

    await this.letterDbService.letterUpdateIsSendIntoTrue(
      letterEntity.letter_id,
    );

    // TODO: IP 비교 핑차이로
    //! 현재는 임시로 시간을 지정했다.
    const currentTime = new Date().getTime();
    const addTime = 500; //* 임시로 설정한 시간 차이

    // TODO: LetterState에 저장
    return await this.letterDbService.saveLetterState(
      letterEntity.letter_id,
      letterEntity.user_id,
      sendUserId,
      currentTime + addTime,
    );
  }

  //* letterId를 이용하여 편지를 찾는다.
  searchLetter(letterId: number) {
    return this.letterDbService.getLetter(letterId);
  }

  //* 유저 Id를 이용하여 LetterState 값을 찾는다.
  searchLetterState(id: string) {
    return this.letterDbService.getLetterUsingid(id);
  }
}
