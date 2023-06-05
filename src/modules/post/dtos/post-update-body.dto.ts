import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { PostCreateBodyDto } from './post-create-body.dto';

export class PostUpdateBodyDto extends PartialType(PostCreateBodyDto) {
  @Exclude()
  code: string;

  @Exclude()
  id: number;
}
