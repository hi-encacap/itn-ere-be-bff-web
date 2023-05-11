import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { WebsiteService } from 'src/modules/website/website.service';

@Injectable()
export class WebsiteApiKeyGuard implements CanActivate {
  constructor(@Inject(WebsiteService) private readonly websiteService: WebsiteService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const websiteApiKey = request.headers['x-website-api-key'] as string;

    if (!websiteApiKey) {
      throw new ForbiddenException();
    }

    const website = await this.websiteService.get({ url: websiteApiKey });

    if (!website) {
      throw new ForbiddenException();
    }

    request.website = website;

    return true;
  }
}
