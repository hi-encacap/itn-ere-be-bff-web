import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { DatabaseConfigModule } from 'src/configs/database/database-config.module';
import DatabaseConfigService from 'src/configs/database/database-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (configService: DatabaseConfigService) => {
        const databaseConfig = configService.postgres;
        return {
          type: databaseConfig.type,
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          autoLoadEntities: true,
          entities: [path.resolve(__dirname, '..', '..', '**', '*.entity{.ts,.js}')],
          synchronize: true,
        };
      },
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
