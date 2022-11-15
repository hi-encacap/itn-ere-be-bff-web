import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { LoggerModule } from './common/modules/logger/logger.module';
import { AppConfigModule } from './configs/config.module';
import { JwtConfigModule } from './configs/jwt/jwt-config.module';
import { JwtConfigService } from './configs/jwt/jwt-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { ContactModule } from './modules/contact/contact.module';
import { UserModule } from './modules/user/user.module';
import { WebsiteModule } from './modules/website/website.module';
import { PostgresDatabaseProviderModule } from './providers/postgres/postgres.module';
import { CloudflareModule } from './modules/cloudflare/cloudflare.module';

@Module({
  imports: [
    AppConfigModule,
    JwtConfigModule,
    PostgresDatabaseProviderModule,
    LoggerModule,

    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.secret,
      }),
      inject: [JwtConfigService],
    }),

    WebsiteModule,
    UserModule,
    AuthModule,
    ContactModule,
    CloudflareModule,
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
