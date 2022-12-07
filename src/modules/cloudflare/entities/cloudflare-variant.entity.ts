import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity } from 'typeorm';
import { CLOUDFLARE_VARIANT_FIT_ENUM } from '../constants/cloudflare-variant.constant';
import { ICloudflareVariant } from '../interfaces/cloudflare-variant.interface';

@Entity({ name: 'cloudflare_variants' })
export class CloudflareVariantEntity extends BaseEntityWithPrimaryCodeColumn implements ICloudflareVariant {
  @Column({
    enum: CLOUDFLARE_VARIANT_FIT_ENUM,
  })
  fit: CLOUDFLARE_VARIANT_FIT_ENUM;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column({ default: false, name: 'is_default' })
  isDefault: boolean;

  websites: WebsiteEntity[];
}
