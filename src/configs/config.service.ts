import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get name() {
    return this.configService.get<string>('name');
  }

  get rootPassword() {
    return this.configService.get<string>('rootPassword');
  }

  get env() {
    return this.configService.get<string>('env');
  }

  get envAlias() {
    const env = this.env;

    if (env === 'development') {
      return 'dev';
    }

    if (env === 'production') {
      return 'prod';
    }

    return env;
  }

  get port() {
    return this.configService.get<number>('port');
  }
}
