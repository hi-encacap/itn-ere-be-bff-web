import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { IMAGE_VARIANT_FIT_ENUM } from '../constants/image-variant.constant';
import { IImageVariant } from '../interfaces/image-variant.interface';

@Entity({ name: 'image_variants' })
export class ImageVariantEntity extends BaseEntityWithPrimaryCodeColumn implements IImageVariant {
  @Column({
    enum: IMAGE_VARIANT_FIT_ENUM,
  })
  fit: IMAGE_VARIANT_FIT_ENUM;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column({ default: false, name: 'is_default' })
  isDefault: boolean;
}
