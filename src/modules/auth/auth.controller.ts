import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserService } from '../user/services/user.service';
import { AuthService } from './auth.service';
import { TokenRefreshBodyDto } from './dto/token-refresh-body.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() { user }) {
    return this.authService.generateAuthToken(user);
  }

  @Post('refresh')
  refreshToken(@Body() { token }: TokenRefreshBodyDto) {
    return this.authService.refreshToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() { user }) {
    return this.userService.findOneById(user.id);
  }
}
