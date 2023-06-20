import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: parseInt(process.env.DB_POSTGRES_PORT as string),
  username: process.env.DB_POSTGRES_USERNAME,
  password: process.env.DB_POSTGRES_PASSWORD,
  database: process.env.DB_POSTGRES_NAME,
  entities: [`${__dirname}src/**/*.entity.{ts,js}`],
  migrations: [`${__dirname}src/migrations/!(*.index).{ts,js}`],
});
