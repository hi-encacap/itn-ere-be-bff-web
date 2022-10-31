import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { IUser } from '../user/constants/user.interface';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
}
