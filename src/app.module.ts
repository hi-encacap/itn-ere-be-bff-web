import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppConfigModule } from './configs/config.module';
import { DatabaseModule } from './configs/database/database.module';
import { JwtConfigModule } from './configs/jwt/jwt-config.module';
import { JwtConfigService } from './configs/jwt/jwt-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { RoleGuard } from './modules/auth/guards/role.guard';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { UserModule } from './modules/user/user.module';
import { WebsiteModule } from './modules/website/website.module';

@Module({
  imports: [
    AppConfigModule,
    JwtConfigModule,
    DatabaseModule,

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
  ],
  controllers: [],
  providers: [JwtStrategy, JwtService, RoleGuard],
  exports: [JwtStrategy, JwtService, RoleGuard],
})
export class AppModule {}
