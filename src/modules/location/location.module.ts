import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GHNConfigModule } from 'src/configs/ghn/ghn-config.module';
import GHNConfigService from 'src/configs/ghn/ghn-config.service';
import { AdminCityController } from './controllers/admin-city.controller';
import { AdminDistrictController } from './controllers/admin-district.controller';
import { GHNController } from './controllers/ghn.controller';
import { DistrictWebsiteEntity } from './entities/district-website.entity';
import { DistrictEntity } from './entities/district.entity';
import { ProvinceWebsiteEntity } from './entities/province-website.entity';
import { ProvinceEntity } from './entities/province.entity';
import { DistrictWebsiteService } from './services/district-website.service';
import { DistrictService } from './services/district.service';
import { GHNService } from './services/ghn.service';
import { ProvinceWebsiteService } from './services/province-website.service';
import { ProvinceService } from './services/province.service';
import { DistrictWebsiteExistsValidator } from './validators/district-website-exists.validator';
import { ProvinceExistsValidator } from './validators/province-exists.validator';
import { ProvinceWebsiteExistsValidator } from './validators/province-website-exists.validator';

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
    TypeOrmModule.forFeature([ProvinceEntity, ProvinceWebsiteEntity, DistrictEntity, DistrictWebsiteEntity]),
  ],
  controllers: [GHNController, AdminCityController, AdminDistrictController],
  providers: [
    GHNService,
    ProvinceService,
    ProvinceWebsiteService,
    ProvinceExistsValidator,
    ProvinceWebsiteExistsValidator,
    DistrictService,
    DistrictWebsiteService,
    DistrictWebsiteExistsValidator,
  ],
})
export class LocationModule {}
