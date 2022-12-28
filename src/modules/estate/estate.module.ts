import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstateQuarterEntity } from './entities/estate-quarter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstateQuarterEntity])],
  controllers: [],
  providers: [],
})
export class EstateModule {}
