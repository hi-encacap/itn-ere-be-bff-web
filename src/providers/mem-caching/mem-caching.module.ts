import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { DatabaseConfigModule } from 'src/configs/database/database-config.module';
import DatabaseConfigService from 'src/configs/database/database-config.service';
import { MemCachingService } from './mem-caching.service';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (databaseConfigService: DatabaseConfigService) => {
        const store = await redisStore({
          socket: {
            host: databaseConfigService.redis.host,
            port: databaseConfigService.redis.port,
          },
          username: databaseConfigService.redis.username,
          password: databaseConfigService.redis.password,
          database: databaseConfigService.redis.database,
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
