import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { EstateQuarterService } from '../services/estate-quarter.service';

@UseGuards(JwtAuthGuard)
@Controller('estates/estate-quarters')
export class EstateQuarterController {
  constructor(private readonly estateQuarterService: EstateQuarterService) {}

  @Get()
  getEstateQuarters() {
    return this.estateQuarterService.getAll();
  }
}
