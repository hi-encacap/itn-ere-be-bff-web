import { CATEGORY_GROUP_ENUM, ICloudflareImageResponse } from '@encacap-group/common/dist/re';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CategoryGroupEntity } from './category-group.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column()
  name: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'thumbnail_id' })
  thumbnailId: string;

  @Column({ name: 'website_id' })
  websiteId: number;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @Column({ name: 'category_group_code' })
  categoryGroupCode: CATEGORY_GROUP_ENUM;

  @OneToOne(() => CloudflareImageEntity)
  @JoinColumn({ name: 'thumbnail_id', referencedColumnName: 'id' })
  thumbnail: ICloudflareImageResponse;

  @ManyToOne(() => CategoryGroupEntity, (categoryGroup) => categoryGroup.categories)
  @JoinColumn({ name: 'category_group_code', referencedColumnName: 'code' })
  categoryGroup: CategoryGroupEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
