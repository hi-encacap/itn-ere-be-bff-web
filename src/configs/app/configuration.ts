import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  host: process.env.API_APP_HOST,
  port: parseInt(process.env.PORT || process.env.API_APP_PORT, 10) || 3000,
  name: process.env.API_APP_NAME,
  rootPassword: process.env.API_APP_SECRET_ROOT_PASSWORD,
}));
