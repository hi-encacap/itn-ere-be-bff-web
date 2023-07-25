import { Module } from '@nestjs/common';
import { PingController } from './controllers/ping.controller';

@Module({
  imports: [],
  controllers: [PingController],
  providers: [],
})
export class HomeModule {}
