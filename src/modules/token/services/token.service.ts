import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { JwtConfigService } from 'src/configs/jwt/jwt-config.service';
import { IJwtPayload } from 'src/modules/auth/interfaces/auth.interface';
import { Repository } from 'typeorm';
import { TOKEN_TYPE_ENUM } from '../constants/token.constant';
import { TokenEntity } from '../entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  async verifyRefreshToken(token: string) {
    const tokenEntity = await this.tokenRepository.findOne({
      where: {
        token,
        type: TOKEN_TYPE_ENUM.REFRESH,
      },
    });

    if (!tokenEntity) {
      throw new UnprocessableEntityException(`Token ${token} is not valid.`);
    }

    const payload = this.jwtService.verify(token, {
      secret: this.jwtConfigService.secret,
      ignoreExpiration: true,
    }) as IJwtPayload;

    return payload;
  }

  async generateRefreshToken(payload: IJwtPayload) {
    const token = this.jwtService.sign(payload, {
      expiresIn: this.jwtConfigService.refreshExpirationDays,
      secret: this.jwtConfigService.secret,
    });

    const tokenExpiresAt = dayjs().add(this.jwtConfigService.refreshExpirationDays, 'day').toDate();

    await this.tokenRepository.save({
      token,
      expiresAt: tokenExpiresAt,
      type: TOKEN_TYPE_ENUM.REFRESH,
      userId: payload.id,
    });

    return token;
  }

  generateAccessToken(payload: IJwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: `${this.jwtConfigService.authExpirationMinutes}m`,
      secret: this.jwtConfigService.secret,
    });
  }
}
