import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from 'src/configs/database/database-config.module';
import DatabaseConfigService from 'src/configs/database/database-config.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: ({ redis }: DatabaseConfigService) => ({
        redis: {
          host: redis.host,
          port: redis.port,
          username: redis.username,
          password: redis.password,
          db: redis.db,
        },
      }),
      inject: [DatabaseConfigService],
    }),
  ],
})
export class BullProviderModule {}
