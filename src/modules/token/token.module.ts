import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigModule } from 'src/configs/jwt/jwt-config.module';
import { TokenEntity } from './entities/token.entity';
import { TokenService } from './services/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity]), JwtModule, JwtConfigModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
