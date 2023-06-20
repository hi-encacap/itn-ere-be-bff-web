import { ESTATE_STATUS_ENUM } from '@encacap-group/common/dist/re';
import { ImageEntity } from '@modules/image/entities/image.entity';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column({
    name: 'upvoted_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  upvotedAt: Date;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'avatar_id', nullable: true })
  avatarId: string;

  @Column({ name: 'status', type: 'enum', enum: ESTATE_STATUS_ENUM, default: ESTATE_STATUS_ENUM.UNPUBLISHED })
  status: ESTATE_STATUS_ENUM;

  @Column({ name: 'website_id' })
  websiteId: number;

  @ManyToOne(() => ImageEntity)
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar: ImageEntity;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
