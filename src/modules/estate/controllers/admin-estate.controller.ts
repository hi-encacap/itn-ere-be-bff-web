import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IUser } from 'encacap/dist/re';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { EstateCreateBodyDto } from '../dtos/estate-create-body.dto';
import { EstateService } from '../services/estate.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/estates')
export class AdminEstateController {
  constructor(private readonly estateService: EstateService) {}

  @Post()
  create(@Body() body: EstateCreateBodyDto, @User() user: IUser) {
    return this.estateService.create(body, user);
  }
}
