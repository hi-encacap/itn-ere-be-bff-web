import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EstateEntity } from './estate.entity';

@Entity({ name: 'estate_images' })
export class EstateImageEntity {
  @PrimaryColumn({ name: 'estate_id' })
  estateId: number;

  @PrimaryColumn({ name: 'image_id' })
  imageId: string;

  // Relations
  @ManyToOne(() => EstateEntity, (estate) => estate.images)
  @JoinColumn({ name: 'estate_id' })
  estate: EstateEntity;

  @ManyToOne(() => CloudflareImageEntity)
  @JoinColumn({ name: 'image_id' })
  image: CloudflareImageEntity;
}
