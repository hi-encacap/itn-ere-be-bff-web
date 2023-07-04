import { ImageVariantEntity } from '@modules/image/entities/image-variant.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MEM_CACHING_KEY_ENUM } from 'src/common/constants/caching.constant';

@Injectable()
export class MemCachingService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  getCloudflareVariants(): Promise<ImageVariantEntity[] | null> {
    return this.cacheManager.get(MEM_CACHING_KEY_ENUM.CLOUDFLARE_VARIANTS);
  }

  setCloudflareVariants(data: ImageVariantEntity[]) {
    return this.cacheManager.set(MEM_CACHING_KEY_ENUM.CLOUDFLARE_VARIANTS, data, 0);
  }

  set(key: string, data: unknown, ttl = 0) {
    return this.cacheManager.set(key, data, ttl);
  }

  async clearCacheByPattern(prefix: string, websiteId?: number) {
    const keys: string[] = await this.cacheManager.store.keys();
    let keyPrefix: string = prefix;

    if (websiteId) {
      keyPrefix = `${websiteId}-${keyPrefix}`;
    }

    keys.forEach((key) => {
      if (key.startsWith(keyPrefix)) {
        this.cacheManager.del(key);
      }
    });
  }
}
