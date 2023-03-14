import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { IRole, IUser } from 'encacap/dist/re';

@Injectable()
export class RootGuard implements CanActivate {
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
    const rootRoleSlug = 'root';

    return userRoles.some((role) => role.slug === rootRoleSlug);
  }
}
