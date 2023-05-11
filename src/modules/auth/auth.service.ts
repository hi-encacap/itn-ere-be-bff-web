import { IREUser } from '@encacap-group/types/dist/re';
import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { TokenService } from '../token/services/token.service';
import { UserService } from '../user/services/user.service';
import { IJwtPayload } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

  async validateUser(email: string, password: string): Promise<Omit<IREUser, 'password'> | null> {
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

  async generateAuthToken(user: IREUser) {
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
