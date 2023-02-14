import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IUser } from 'encacap/dist/re';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UnitPriceListQueryDto } from '../dtos/unit-price-list-query.dto';
import { UnitPriceService } from '../services/unit-price.service';

@UseGuards(JwtAuthGuard)
@Controller('unit-prices')
export class UnitPriceController {
  constructor(private readonly unitPriceService: UnitPriceService) {}

  @Get()
  async getUnitPrices(@Query() query: UnitPriceListQueryDto, @User() user: IUser) {
    return this.unitPriceService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }
}
