import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE,
  postgres: {
    host: process.env.DB_POSTGRES_HOST,
    port: process.env.DB_POSTGRES_PORT,
    username: process.env.DB_POSTGRES_USERNAME,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_NAME,
  },
  redis: {
    host: process.env.DB_REDIS_HOST,
    port: process.env.DB_REDIS_PORT,
    username: process.env.DB_REDIS_USERNAME,
    password: process.env.DB_REDIS_PASSWORD,
    database: process.env.DB_REDIS_DATABASE,
  },
}));
