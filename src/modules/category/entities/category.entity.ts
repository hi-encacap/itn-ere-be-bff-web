import { CATEGORY_GROUP_ENUM } from '@encacap-group/types/dist/re';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CategoryGroupEntity } from './category-group.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column()
  name: string;

  @Column({ name: 'code', unique: true })
  code: string;

  @Column({ name: 'thumbnail_id' })
  thumbnailId: string;

  @Column({ name: 'website_id' })
  websiteId: number;

  @Column({ name: 'category_group_code' })
  categoryGroupCode: CATEGORY_GROUP_ENUM;

  @OneToOne(() => CloudflareImageEntity)
  @JoinColumn({ name: 'thumbnail_id', referencedColumnName: 'id' })
  thumbnail: CloudflareImageEntity;

  @ManyToOne(() => CategoryGroupEntity, (categoryGroup) => categoryGroup.categories)
  @JoinColumn({ name: 'category_group_code', referencedColumnName: 'code' })
  categoryGroup: CategoryGroupEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
