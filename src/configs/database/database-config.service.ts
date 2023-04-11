import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export default class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get postgres(): PostgresConnectionOptions {
    return {
      type: this.configService.get('postgres.type'),
      host: this.configService.get<string>('postgres.host'),
      port: this.configService.get<number>('postgres.port'),
      username: this.configService.get<string>('postgres.username'),
      password: this.configService.get<string>('postgres.password'),
      database: this.configService.get<string>('postgres.database'),
    };
  }

  get redis() {
    return {
      host: this.configService.get<string>('redis.host'),
      port: this.configService.get<number>('redis.port'),
      password: this.configService.get<string>('redis.password'),
      database: this.configService.get<number>('redis.database'),
    };
  }
}
