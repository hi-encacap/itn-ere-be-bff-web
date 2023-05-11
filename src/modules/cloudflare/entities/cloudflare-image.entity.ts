import { BaseEntityWithPrimaryStringColumn } from 'src/base/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CLOUDFLARE_IMAGE_STATUS_ENUM } from '../constants/cloudflare-image-status.constant';
import { CloudflareVariantEntity } from './cloudflare-variant.entity';

@Entity({ name: 'cloudflare_images' })
export class CloudflareImageEntity extends BaseEntityWithPrimaryStringColumn {
  @Column({
    name: 'status',
    default: CLOUDFLARE_IMAGE_STATUS_ENUM.PROCESSING,
    enum: CLOUDFLARE_IMAGE_STATUS_ENUM,
  })
  status: CLOUDFLARE_IMAGE_STATUS_ENUM;

  @Column({ name: 'size', default: 0 })
  size: number;

  @Column({ name: 'extension', nullable: true })
  extension: string;

  @Column({ name: 'website_id' })
  websiteId: number;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;

  @OneToMany(() => UserEntity, (user) => user.avatar)
  users: UserEntity[];

  variants: CloudflareVariantEntity[];
  urls: string[];
}
