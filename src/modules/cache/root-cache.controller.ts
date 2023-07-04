import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { RootAuthGuard } from '@guards/root-auth.guard';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { CacheService } from './cache.service';

@UseGuards(JwtAuthGuard, RootAuthGuard)
@Controller('root/caches')
export class RootCacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Delete('websites/:websiteId')
  clearWebsiteCache(@Param('websiteId') websiteId: number) {
    return this.cacheService.clearWebsiteCache(websiteId);
  }
}
