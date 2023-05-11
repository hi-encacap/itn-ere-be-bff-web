import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  port: parseInt(process.env.PORT || process.env.APP_PORT, 10) || 3000,
  name: process.env.APP_NAME,
  rootPassword: process.env.APP_SECRET_ROOT_PASSWORD,
}));
