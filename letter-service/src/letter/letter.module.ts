import { Module } from '@nestjs/common';
// import { LetterController } from './letter.controller';
// import { LetterService } from './letter.service';
import { LetterGateway } from './letter.gateway';

@Module({
  providers: [LetterGateway],
})
export class LetterModule {}
