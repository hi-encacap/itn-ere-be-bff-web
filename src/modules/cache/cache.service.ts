import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async clearWebsiteCache(websiteId: number) {
    const keys = await this.cacheManager.store.keys();

    keys.forEach((key) => {
      if (!key.startsWith(`${websiteId}-`)) {
        return;
      }

      this.cacheManager.del(key);
    });
  }
}
