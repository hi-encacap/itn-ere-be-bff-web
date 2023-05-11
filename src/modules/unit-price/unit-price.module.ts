import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitPriceController } from './controllers/unit-price.controller';
import { UnitPriceEntity } from './entities/unit-price.entity';
import { UnitPriceService } from './services/unit-price.service';
import { UnitPriceExistsValidator } from './validators/unit-price-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UnitPriceEntity])],
  controllers: [UnitPriceController],
  providers: [UnitPriceService, UnitPriceExistsValidator],
  exports: [UnitPriceService, UnitPriceExistsValidator],
})
export class UnitPriceModule {}
