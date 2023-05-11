import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-ioredis-yet';
import { RedisOptions } from 'ioredis';
import { DatabaseConfigModule } from 'src/configs/database/database-config.module';
import DatabaseConfigService from 'src/configs/database/database-config.service';
import { MemCachingService } from './mem-caching.service';

@Module({
  imports: [
    CacheModule.registerAsync<RedisOptions>({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (databaseConfigService: DatabaseConfigService) => {
        const { redis } = databaseConfigService;

        const store = await redisStore({
          host: redis.host,
          port: redis.port,
          username: redis.username,
          password: redis.password,
          db: redis.database,
        });

        return {
          isGlobal: true,
          store: store as unknown as CacheStore,
        };
      },
    }),
  ],
  providers: [MemCachingService],
  exports: [MemCachingService],
})
export class MemCachingProviderModule {}
