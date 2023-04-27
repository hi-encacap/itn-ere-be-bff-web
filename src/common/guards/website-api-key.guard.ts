import { IRole } from '@encacap-group/types/dist/account';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class WebsiteApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const websiteApiKey = request.headers['x-website-api-key'] as string;

    if (!websiteApiKey) {
      throw new ForbiddenException();
    }

    const website = { id: Number(websiteApiKey) }; // TODO: get website id from website api key

    if (!website) {
      throw new ForbiddenException();
    }

    request.website = website;

    return true;
  }

  private matchRoles(userRoles: IRole[]): boolean {
    const rootRoleSlug = 'user';

    return userRoles.some((role) => role.slug === rootRoleSlug);
  }
}
