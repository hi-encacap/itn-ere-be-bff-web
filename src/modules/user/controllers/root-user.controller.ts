import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootGuard } from 'src/common/guards/root.guard';
import { RootUserCreateBodyDto } from '../dtos/root-user-create-body.dto';
import { RootUserUpdateBodyDto } from '../dtos/root-user-update-body.dto';
import { UserService } from '../services/user.service';

@UseGuards(JwtAuthGuard, RootGuard)
@Controller('root/users')
export class RootUserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body: RootUserCreateBodyDto) {
    return this.userService.create(body);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: RootUserUpdateBodyDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }
}
