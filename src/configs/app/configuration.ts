import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  host: process.env.RE_API_APP_HOST,
  port: parseInt(process.env.PORT ?? process.env.RE_API_APP_PORT, 10) ?? 3000,
  name: process.env.RE_API_APP_NAME,
  rootPassword: process.env.RE_API_APP_SECRET_ROOT_PASSWORD,
}));
