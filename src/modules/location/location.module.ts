import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GHNConfigModule } from 'src/configs/ghn/ghn-config.module';
import GHNConfigService from 'src/configs/ghn/ghn-config.service';
import { AdminDistrictController } from './controllers/admin-district.controller';
import { AdminProvinceController } from './controllers/admin-province.controller';
import { AdminWardController } from './controllers/admin-ward.controller';
import { GHNController } from './controllers/ghn.controller';
import { DistrictWebsiteEntity } from './entities/district-website.entity';
import { DistrictEntity } from './entities/district.entity';
import { ProvinceWebsiteEntity } from './entities/province-website.entity';
import { ProvinceEntity } from './entities/province.entity';
import { WardWebsiteEntity } from './entities/ward-website.entity';
import { WardEntity } from './entities/ward.entity';
import { DistrictWebsiteService } from './services/district-website.service';
import { DistrictService } from './services/district.service';
import { GHNService } from './services/ghn.service';
import { ProvinceWebsiteService } from './services/province-website.service';
import { ProvinceService } from './services/province.service';
import { WardWebsiteService } from './services/ward-website.service';
import { WardService } from './services/ward.service';
import { DistrictWebsiteExistsValidator } from './validators/district-website-exists.validator';
import { ProvinceWebsiteExistsValidator } from './validators/province-website-exists.validator';
import { WardWebsiteExistsValidator } from './validators/ward-website-exists.validator';

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
    TypeOrmModule.forFeature([
      ProvinceEntity,
      ProvinceWebsiteEntity,
      DistrictEntity,
      DistrictWebsiteEntity,
      WardEntity,
      WardWebsiteEntity,
    ]),
  ],
  controllers: [GHNController, AdminProvinceController, AdminDistrictController, AdminWardController],
  providers: [
    GHNService,
    ProvinceService,
    ProvinceWebsiteService,
    DistrictService,
    DistrictWebsiteService,
    WardService,
    WardWebsiteService,
    ProvinceWebsiteExistsValidator,
    DistrictWebsiteExistsValidator,
    WardWebsiteExistsValidator,
  ],
  exports: [],
})
export class LocationModule {}
