import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlgoliaModule } from '../algolia/algolia.module';
import { CategoryModule } from '../category/category.module';
import { CloudflareModule } from '../cloudflare/cloudflare.module';
import { LocationModule } from '../location/location.module';
import { UnitPriceModule } from '../unit-price/unit-price.module';
import { AdminEstateController } from './controllers/admin-estate.controller';
import { EstateImageEntity } from './entities/estate-image.entity';
import { EstatePropertyEntity } from './entities/estate-property.entity';
import { EstateQuarterEntity } from './entities/estate-quarter.entity';
import { EstateEntity } from './entities/estate.entity';
import { EstateImageService } from './services/estate-image.service';
import { EstatePropertyService } from './services/estate-property.service';
import { EstateService } from './services/estate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstateQuarterEntity, EstateEntity, EstatePropertyEntity, EstateImageEntity]),
    LocationModule,
    CategoryModule,
    UnitPriceModule,
    CloudflareModule,
    AlgoliaModule,
  ],
  controllers: [AdminEstateController],
  providers: [EstateService, EstateImageService, EstatePropertyService],
})
export class EstateModule {}
