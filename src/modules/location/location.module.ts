import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GHNConfigModule } from 'src/configs/ghn/ghn-config.module';
import GHNConfigService from 'src/configs/ghn/ghn-config.service';
import { GHNController } from './controllers/ghn.controller';
import { GHNService } from './services/ghn.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [GHNConfigModule],
      inject: [GHNConfigService],
      useFactory: (config: GHNConfigService) => ({
        baseURL: config.apiUrl,
        headers: {
          'Content-Type': 'application/json',
          Token: config.apiToken,
        },
      }),
    }),
  ],
  controllers: [GHNController],
  providers: [GHNService],
})
export class LocationModule {}
