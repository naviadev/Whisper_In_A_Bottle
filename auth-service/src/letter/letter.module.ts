import { Module } from '@nestjs/common';
import { letterGateway } from './letter.gateway';

@Module({
  providers: [letterGateway],
})
export class letterModule {}
