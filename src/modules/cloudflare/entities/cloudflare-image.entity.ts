import { BaseEntityWithPrimaryStringColumn } from 'src/base/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CloudflareImageStatusEnum } from '../constants/cloudflare-image-status.constant';

@Entity({ name: 'cloudflare_images' })
export class CloudflareImageEntity extends BaseEntityWithPrimaryStringColumn {
  @Column({ name: 'status', default: CloudflareImageStatusEnum.PROCESSING, enum: CloudflareImageStatusEnum })
  status: CloudflareImageStatusEnum;

  @Column({ name: 'size', default: 0 })
  size: number;

  @Column({ name: 'extension', nullable: true })
  extension: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.cloudflareImages)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
