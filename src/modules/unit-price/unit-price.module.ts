import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitPriceEntity } from './entities/unit-price.entity';
import { UnitPriceService } from './services/unit-price.service';
import { UnitPriceExistsValidator } from './validators/unit-price-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UnitPriceEntity])],
  controllers: [],
  providers: [UnitPriceService, UnitPriceExistsValidator],
  exports: [UnitPriceExistsValidator],
})
export class UnitPriceModule {}
