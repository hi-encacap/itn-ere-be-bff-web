import { CACHE_KEY_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class WebsiteMemCachingInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const cacheKey = this.reflector.get(CACHE_KEY_METADATA, context.getHandler());

    if (cacheKey) {
      const request = context.switchToHttp().getRequest();
      let websiteId: string | null = null;

      if (request.website) {
        websiteId = request.website.id;
      } else if (request.user) {
        websiteId = request.user.websiteId;
      }

      if (websiteId) {
        return `${websiteId}-${cacheKey}-${request._parsedUrl.query}`;
      }

      return `${cacheKey}-${request._parsedUrl.query}`;
    }

    return super.trackBy(context);
  }
}
