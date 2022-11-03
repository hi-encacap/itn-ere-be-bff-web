import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRole, IUser } from 'src/modules/user/constants/user.interface';

@Injectable()
export class RootGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;

    return this.matchRoles(user.roles);
  }

  private matchRoles(userRoles: IRole[]): boolean {
    const rootRoleSlug = 'root';

    return userRoles.some((role) => role.slug === rootRoleSlug);
  }
}
