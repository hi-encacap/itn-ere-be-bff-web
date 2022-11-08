import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from 'src/configs/database/database-config.module';
import DatabaseConfigService from 'src/configs/database/database-config.service';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (configService: DatabaseConfigService): PostgresConnectionOptions => {
        const databaseConfig = configService.postgres;
        return {
          type: databaseConfig.type,
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          entities: [UserEntity, UserRoleMappingEntity, RoleEntity, WebsiteEntity],
          synchronize: true,
        };
      },
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
