import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get name() {
    return this.configService.get<string>('app.name');
  }

  get rootPassword() {
    return this.configService.get<string>('app.rootPassword');
  }

  get env() {
    return this.configService.get<string>('app.env');
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
    return this.configService.get<number>('app.port');
  }

  get host() {
    return this.configService.get<string>('app.host');
  }

  get isProduction() {
    return this.env === 'production';
  }
}
