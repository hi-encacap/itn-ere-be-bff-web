import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GHNConfigModule } from 'src/configs/ghn/ghn-config.module';
import GHNConfigService from 'src/configs/ghn/ghn-config.service';
import { AdminProvinceController } from './controllers/admin-province.controller';
import { GHNController } from './controllers/ghn.controller';
import { ProvinceWebsiteEntity } from './entities/province-website.entity';
import { ProvinceEntity } from './entities/province.entity';
import { DistrictService } from './services/district.service';
import { GHNService } from './services/ghn.service';
import { ProvinceWebsiteService } from './services/province-website.service';
import { ProvinceService } from './services/province.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [GHNConfigModule],
      inject: [GHNConfigService],
      useFactory: (ghnConfigService: GHNConfigService) => ({
        baseURL: ghnConfigService.apiUrl,
        headers: {
          Token: ghnConfigService.apiToken,
        },
      }),
    }),
    TypeOrmModule.forFeature([ProvinceEntity, ProvinceWebsiteEntity]),
  ],
  controllers: [GHNController, AdminProvinceController],
  providers: [GHNService, ProvinceService, ProvinceWebsiteService, DistrictService],
  exports: [],
})
export class LocationModule {}
