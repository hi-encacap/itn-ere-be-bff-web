import { IRole } from '@encacap-group/types/dist/account';
import { IREUser } from '@encacap-group/types/dist/re';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ROLE_ENUM } from '../constants/role.constant';

@Injectable()
export class AdminGuard implements CanActivate {
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
    const rootRoleSlug = ROLE_ENUM.ADMIN;

    return userRoles.some((role) => role.slug === rootRoleSlug);
  }
}
