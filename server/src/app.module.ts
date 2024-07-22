import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { letterModule } from './letter/letter.module';

@Module({
  imports: [letterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
