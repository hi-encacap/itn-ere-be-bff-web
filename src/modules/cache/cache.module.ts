import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RootCacheController } from './root-cache.controller';

@Module({
  imports: [],
  controllers: [RootCacheController],
  providers: [CacheService],
})
export class CacheModule {}
