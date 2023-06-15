import { BaseEntityWithPrimaryStringColumn } from 'src/base/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IMAGE_STATUS_ENUM } from '../constants/image-status.constant';
import { ImageVariantEntity } from './image-variant.entity';

@Entity({ name: 'images' })
export class ImageEntity extends BaseEntityWithPrimaryStringColumn {
  @Column({
    name: 'status',
    default: IMAGE_STATUS_ENUM.PROCESSING,
    enum: IMAGE_STATUS_ENUM,
  })
  status: IMAGE_STATUS_ENUM;

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

  variants: ImageVariantEntity[];
  urls: string[];
}
