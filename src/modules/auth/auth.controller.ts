import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserService } from '../user/services/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() { user }) {
    return this.authService.generateAuthToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() { user }) {
    console.log(user.id.id.id);
    return await this.userService.findOneById(user.id);
  }
}
