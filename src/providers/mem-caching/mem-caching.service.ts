import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MEM_CACHING_KEY_ENUM } from 'src/common/constants/caching.constant';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';

@Injectable()
export class MemCachingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getCloudflareVariants(): Promise<CloudflareVariantEntity[] | null> {
    return this.cacheManager.get(MEM_CACHING_KEY_ENUM.CLOUDFLARE_VARIANTS);
  }

  setCloudflareVariants(data: CloudflareVariantEntity[]) {
    return this.cacheManager.set(MEM_CACHING_KEY_ENUM.CLOUDFLARE_VARIANTS, data, 0);
  }
}
