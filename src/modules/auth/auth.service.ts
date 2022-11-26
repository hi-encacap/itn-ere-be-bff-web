import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { TokenService } from '../token/services/token.service';
import { IUser } from '../user/interfaces/user.interface';
import { UserService } from '../user/services/user.service';
import { IJwtPayload } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

  async validateUser(email: string, password: string): Promise<Omit<IUser, 'password'> | null> {
    const user = await this.userService.findOne({
      email,
    });

    if (!user) {
      return null;
    }

    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword) {
      return null;
    }

    return omit(user, ['password']);
  }

  async generateAuthToken(user: IUser) {
    const payload: IJwtPayload = user;

    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    return {
      authTokens: {
        accessToken,
        refreshToken,
      },
      user,
    };
  }

  async refreshToken(token: string) {
    const payload = await this.tokenService.verifyRefreshToken(token);
    const user = await this.userService.findOneById(payload.id);

    return this.generateAuthToken(user);
  }
}
