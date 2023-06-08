import { registerAs } from '@nestjs/config';

const jwtConfiguration = registerAs('jwt', () => ({
  secret: process.env.RE_API_APP_JWT_SECRET,
  signOption: {
    authExpirationMinutes: process.env.RE_API_APP_JWT_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.RE_API_APP_JWT_REFRESH_EXPIRATION_DAYS,
  },
}));

export default jwtConfiguration;
