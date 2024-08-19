import { Module } from '@nestjs/common';
import { LetterModule } from './letter/letter.module';

@Module({
  imports: [LetterModule],
})
export class AppModule {}
