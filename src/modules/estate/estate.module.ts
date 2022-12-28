import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstateImageEntity } from './entities/estate-image.entity';
import { EstatePropertyEntity } from './entities/estate-property.entity';
import { EstateQuarterEntity } from './entities/estate-quarter.entity';
import { EstateEntity } from './entities/estate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstateQuarterEntity, EstateEntity, EstatePropertyEntity, EstateImageEntity]),
  ],
  controllers: [],
  providers: [],
})
export class EstateModule {}
