import { IRole } from '@encacap-group/common/dist/account';
import { IREUser } from '@encacap-group/common/dist/re';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ROLE_SLUG_ENUM } from '../constants/role.constant';

@Injectable()
export class RootAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: IREUser = request.user;

    const isMatchRole = this.matchRoles(user.roles);

    if (!isMatchRole) {
      throw new ForbiddenException();
    }

    return true;
  }

  private matchRoles(userRoles: IRole[]): boolean {
    return userRoles.some((role) => role.slug === ROLE_SLUG_ENUM.ROOT);
  }
}
