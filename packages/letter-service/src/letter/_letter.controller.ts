// import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
// import { LetterDTO } from './dto/letter.dto';
// import { LetterDbService } from './letter-db.service';
// import { LetterService } from './letter.service';
// import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// @ApiTags('편지')
// @Controller('letter')
// export class LetterController {
//   constructor(
//     private readonly letterDbService: LetterDbService,
//     private readonly letterService: LetterService,
//   ) {}

//   @ApiOperation({
//     summary: '전송한 편지를 저장하고 유저를 선별하는 엔드포인트.',
//   })
//   @ApiResponse({ status: 200, description: '편지가 성공적으로 전송.' })
//   @ApiResponse({
//     status: 401,
//     description: '편지를 전달할 수 있는 권한이 존재하지 않음.',
//   })
//   @ApiBody({ type: LetterDTO, description: '편지 전송에 필요한 정보' })
//   @Post()
//   async sendLetterToUser(
//     @Body(new ValidationPipe({ forbidNonWhitelisted: true })) letter: LetterDTO,
//   ) {
//     // TODO: 편지 저장
//     const letterEntity = await this.letterDbService.saveLetter(letter.body);
//     // TODO: RandomPlayer 선정
//     const selectUser = await this.letterDbService.getUserWithLongestReceiveTime(
//       letter.id,
//     );

//     // TODO: IP 비교 핑차이로
//     //! 현재는 임시로 시간을 지정했다.
//     const currentTime = new Date().getTime();
//     const addTime = 500; //* 임시로 설정한 시간 차이

//     // TODO: LetterState에 저장
//     await this.letterDbService.saveLetterState(
//       letterEntity.letterId,
//       letter.id,
//       selectUser.userId,
//       currentTime + addTime,
//     );

//     // TODO: 유저가 접속해 있는지 확인
//     // TODO: 접속해 있으면 편지 보내고 LetterState 삭제
//     if (this.letterService.ckectUserConnected(selectUser.userId)) {
//       //* 타임아웃으로 편지 보내기
//       const timeoutId = setTimeout(() => {
//         if (this.letterService.sendLetter(selectUser.userId, letter) === true) {
//           this.letterDbService.deleteLetterState(letterEntity.letterId);
//         }
//       }, addTime);

//       //* 현재 timeout 저장
//       this.letterService.saveNodeJsTimeoutId(selectUser.userId, timeoutId);
//     }

//     return;
//   }
// }
