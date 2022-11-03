import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RootGuard } from './guards/root.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() { user }) {
    return this.authService.generateAuthToken(user);
  }

  @UseGuards(JwtAuthGuard, RootGuard)
  @Get('me')
  async me(@Request() { user }) {
    return await this.userService.findOneById(user.id);
  }
}
