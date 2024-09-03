import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LetterDbService } from './letter_db.service';
import { LetterSaveDTO } from '@shared/dtos/letter.dto';

@Controller('letter')
export class LetterController {
  constructor(private readonly letterDBService: LetterDbService) {}

  @Post()
  async saveLetter(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    letterSave: LetterSaveDTO,
  ) {
    await this.letterDBService.checkMaxLetterSaveCount(letterSave.userId);
    await this.letterDBService.saveLetterSave(
      letterSave.userId,
      letterSave.letterId,
    );
  }
}
