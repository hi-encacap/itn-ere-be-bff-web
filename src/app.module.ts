import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { LoggerModule } from './common/modules/logger/logger.module';
import { AlgoliaConfigModule } from './configs/algolia/algolia-config.module';
import { CloudflareConfigModule } from './configs/cloudflare/cloudflare-config.module';
import { AppConfigModule } from './configs/config.module';
import { DatabaseConfigModule } from './configs/database/database-config.module';
import DatabaseConfigService from './configs/database/database-config.service';
import { JwtConfigModule } from './configs/jwt/jwt-config.module';
import { JwtConfigService } from './configs/jwt/jwt-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { CategoryModule } from './modules/category/category.module';
import { CloudflareModule } from './modules/cloudflare/cloudflare.module';
import { ContactModule } from './modules/contact/contact.module';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { WebsiteModule } from './modules/website/website.module';
import { PostgresDatabaseProviderModule } from './providers/postgres/postgres.module';

@Module({
  imports: [
    AppConfigModule,
    JwtConfigModule,
    CloudflareConfigModule,
    AlgoliaConfigModule,

    PostgresDatabaseProviderModule,

    LoggerModule,

    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.secret,
      }),
      inject: [JwtConfigService],
    }),
    BullModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (databaseConfigService: DatabaseConfigService) => ({
        redis: {
          host: databaseConfigService.redis.host,
          port: databaseConfigService.redis.port,
        },
      }),
      inject: [DatabaseConfigService],
    }),

    WebsiteModule,
    UserModule,
    AuthModule,
    TokenModule,
    ContactModule,
    CloudflareModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [JwtStrategy, JwtService],
  exports: [JwtStrategy, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
