import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GHNConfigModule } from 'src/configs/ghn/ghn-config.module';
import GHNConfigService from 'src/configs/ghn/ghn-config.service';
import { AdminDistrictController } from './controllers/admin-district.controller';
import { AdminProvinceController } from './controllers/admin-province.controller';
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
import { ProvinceWebsiteExistsValidator } from './validators/province-website-exists.validator';

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
    TypeOrmModule.forFeature([ProvinceEntity, ProvinceWebsiteEntity, DistrictEntity, DistrictWebsiteEntity]),
  ],
  controllers: [GHNController, AdminProvinceController, AdminDistrictController],
  providers: [
    GHNService,
    ProvinceService,
    ProvinceWebsiteService,
    DistrictService,
    DistrictWebsiteService,
    ProvinceWebsiteExistsValidator,
  ],
  exports: [],
})
export class LocationModule {}
