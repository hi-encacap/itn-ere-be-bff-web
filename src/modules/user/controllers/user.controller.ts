import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body: UserEntity) {
    return this.userService.create(body);
  }
}
