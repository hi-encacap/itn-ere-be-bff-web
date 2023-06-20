import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlgoliaModule } from '../algolia/algolia.module';
import { CategoryModule } from '../category/category.module';
import { ContactModule } from '../contact/contact.module';
import { CloudflareModule } from '../image/cloudflare.module';
import { LocationModule } from '../location/location.module';
import { UnitPriceModule } from '../unit-price/unit-price.module';
import { AdminEstateDraftController } from './controllers/admin-estate-draft.controller';
import { AdminEstateController } from './controllers/admin-estate.controller';
import { EstateQuarterController } from './controllers/estate-quarter.controller';
import { PublicEstateController } from './controllers/public-estate.controller';
import { EstateDraftEntity } from './entities/estate-draft.entity';
import { EstateImageEntity } from './entities/estate-image.entity';
import { EstatePropertyEntity } from './entities/estate-property.entity';
import { EstateQuarterEntity } from './entities/estate-quarter.entity';
import { EstateEntity } from './entities/estate.entity';
import { EstateDraftService } from './services/estate-draft.service';
import { EstateImageService } from './services/estate-image.service';
import { EstatePropertyService } from './services/estate-property.service';
import { EstateQuarterService } from './services/estate-quarter.service';
import { EstateService } from './services/estate.service';
import { EstateExistsValidator } from './validators/estate-exists.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstateQuarterEntity,
      EstateEntity,
      EstateDraftEntity,
      EstatePropertyEntity,
      EstateImageEntity,
    ]),
    LocationModule,
    CategoryModule,
    UnitPriceModule,
    CloudflareModule,
    ContactModule,
    AlgoliaModule,
    UnitPriceModule,
    LocationModule,
  ],
  controllers: [
    EstateQuarterController,
    AdminEstateDraftController,
    AdminEstateController,
    PublicEstateController,
  ],
  providers: [
    EstateQuarterService,
    EstateService,
    EstateDraftService,
    EstateImageService,
    EstatePropertyService,
    EstateExistsValidator,
  ],
})
export class EstateModule {}
