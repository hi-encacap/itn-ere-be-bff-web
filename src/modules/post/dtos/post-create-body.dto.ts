import { ESTATE_STATUS_ENUM } from '@encacap-group/common/dist/re';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { Allow, IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { CategoryExistsValidator } from 'src/modules/category/validators/category-exists.validator';
import { CloudflareImageNotExistsValidator } from 'src/modules/cloudflare/validators/cloudflare-image-not-exists.validator';
import { PostExistsValidator } from '../validators/post-exists.validator';

export class PostCreateBodyDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Validate(PostExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'code'])
  code?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @Validate(CategoryExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'id'])
  categoryId: number;

  @ApiPropertyOptional({ enum: ESTATE_STATUS_ENUM, enumName: 'ESTATE_STATUS_ENUM' })
  @Allow()
  @Exclude()
  status: ESTATE_STATUS_ENUM;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  @Validate(CloudflareImageNotExistsValidator)
  avatarId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  websiteId?: number;
}
