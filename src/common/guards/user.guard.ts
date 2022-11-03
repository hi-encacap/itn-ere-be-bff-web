import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { IRole, IUser } from 'src/modules/user/interfaces/user.interface';

@Injectable()
export class UserGuard implements CanActivate {
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
    const rootRoleSlug = 'user';

    return userRoles.some((role) => role.slug === rootRoleSlug);
  }
}
