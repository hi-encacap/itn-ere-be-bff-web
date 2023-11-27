import { ImageEntity } from '@modules/image/entities/image.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity({ name: 'post_images' })
export class PostImageEntity {
  @PrimaryColumn({ name: 'post_id' })
  postId: number;

  @PrimaryColumn({ name: 'image_id' })
  imageId: string;

  // Relations
  @ManyToOne(() => PostEntity, (post) => post.images)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => ImageEntity)
  @JoinColumn({ name: 'image_id' })
  image: ImageEntity;
}
