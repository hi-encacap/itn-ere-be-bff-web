import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { LocationModule } from '../location/location.module';
import { EstateController } from './controllers/estate.controller';
import { EstateImageEntity } from './entities/estate-image.entity';
import { EstatePropertyEntity } from './entities/estate-property.entity';
import { EstateQuarterEntity } from './entities/estate-quarter.entity';
import { EstateEntity } from './entities/estate.entity';
import { EstateService } from './services/estate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstateQuarterEntity, EstateEntity, EstatePropertyEntity, EstateImageEntity]),
    LocationModule,
    CategoryModule,
  ],
  controllers: [EstateController],
  providers: [EstateService],
})
export class EstateModule {}
