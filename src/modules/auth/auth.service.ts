import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { omit } from 'lodash';
import { JwtConfigService } from 'src/configs/jwt/jwt-config.service';
import { IUser } from '../user/constants/user.interface';
import { UserService } from '../user/services/user.service';
import { IJwtPayload } from './constants/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<IUser, 'password'> | null> {
    const user = await this.userService.findOneByEmail(email);

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
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
      website: user.website,
    };

    const token = await this.generateToken(payload, {
      expiresIn: `${this.jwtConfigService.authExpirationMinutes}m`,
    });

    return {
      authTokens: {
        accessToken: token,
      },
      user,
    };
  }

  private async generateToken(payload: IJwtPayload, options: JwtSignOptions) {
    return this.jwtService.sign(payload, options);
  }
}
