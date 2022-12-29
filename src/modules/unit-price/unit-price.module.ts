import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitPriceEntity } from './entities/unit-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitPriceEntity])],
  controllers: [],
  providers: [],
})
export class UnitPriceModule {}
