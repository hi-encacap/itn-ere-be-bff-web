import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { IRole, IUser } from 'src/modules/user/constants/user.interface';

@Injectable()
export class ManagerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;

    const isMatchRole = this.matchRoles(user.roles);

    if (!isMatchRole) {
      throw new ForbiddenException();
    }

    return true;
  }

  private matchRoles(userRoles: IRole[]): boolean {
    const rootRoleSlug = 'manager';

    return userRoles.some((role) => role.slug === rootRoleSlug);
  }
}
