import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PostCreateBodyDto } from './post-create-body.dto';

export class PostDraftCreateBodyDto extends PartialType(PostCreateBodyDto) {
  @ApiProperty()
  @IsString()
  title: string;
}
