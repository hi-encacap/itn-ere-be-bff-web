import { BaseEntityWithPrimaryStringColumn } from 'src/base/base.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity } from 'typeorm';
import { CloudflareVariantFitEnum } from '../constants/cloudflare-variant-fit.constant';
import { ICloudflareVariant } from '../interfaces/cloudflare-variant.interface';

@Entity({ name: 'cloudflare_variants' })
export class CloudflareVariantEntity extends BaseEntityWithPrimaryStringColumn implements ICloudflareVariant {
  @Column({
    enum: CloudflareVariantFitEnum,
  })
  fit: CloudflareVariantFitEnum;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column({ default: false })
  isDefault: boolean;

  websites: WebsiteEntity[];
}
