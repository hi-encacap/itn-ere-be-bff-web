import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export default class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get postgres(): PostgresConnectionOptions {
    return {
      type: this.configService.get('database.type'),
      host: this.configService.get<string>('database.postgres.host'),
      port: this.configService.get<number>('database.postgres.port'),
      username: this.configService.get<string>('database.postgres.username'),
      password: this.configService.get<string>('database.postgres.password'),
      database: this.configService.get<string>('database.postgres.database'),
    };
  }

  get redis(): RedisOptions {
    return {
      host: this.configService.get<string>('database.redis.host'),
      port: this.configService.get<number>('database.redis.port'),
      username: this.configService.get<string>('database.redis.username'),
      password: this.configService.get<string>('database.redis.password'),
      db: this.configService.get<number>('database.redis.database'),
    };
  }
}
