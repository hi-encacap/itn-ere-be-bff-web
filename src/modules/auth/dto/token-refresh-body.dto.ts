import { IsString } from 'class-validator';

export class TokenRefreshBodyDto {
  @IsString()
  token: string;
}
