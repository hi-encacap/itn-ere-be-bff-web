import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export default class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get postgres(): PostgresConnectionOptions {
    return {
      type: this.configService.get('type'),
      host: this.configService.get<string>('host'),
      port: this.configService.get<number>('port'),
      username: this.configService.get<string>('username'),
      password: this.configService.get<string>('password'),
      database: this.configService.get<string>('database'),
    };
  }
}
