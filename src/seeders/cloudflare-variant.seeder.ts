import { DEFAULT_CLOUDFLARE_VARIANT_ENUM } from '@encacap-group/common/dist/re';
import { IMAGE_VARIANT_FIT_ENUM } from '@modules/image/constants/image-variant.constant';
import { ImageVariantEntity } from '@modules/image/entities/image-variant.entity';
import { IImageVariant } from '@modules/image/interfaces/image-variant.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';

const variantItems: IImageVariant[] = [
  {
    code: DEFAULT_CLOUDFLARE_VARIANT_ENUM.PUBLIC,
    fit: IMAGE_VARIANT_FIT_ENUM.SCALE_DOWN,
    width: null,
    height: null,
    isDefault: true,
  },
  {
    code: DEFAULT_CLOUDFLARE_VARIANT_ENUM.SMALL,
    fit: IMAGE_VARIANT_FIT_ENUM.SCALE_DOWN,
    width: 96,
    height: null,
    isDefault: true,
  },
  {
    code: DEFAULT_CLOUDFLARE_VARIANT_ENUM.THUMBNAIL,
    fit: IMAGE_VARIANT_FIT_ENUM.SCALE_DOWN,
    width: 400,
    height: 768,
    isDefault: true,
  },
];

@Injectable()
export class CloudflareVariantSeeder implements Seeder {
  constructor(
    @InjectRepository(ImageVariantEntity)
    private readonly cloudflareVariantRepository: Repository<ImageVariantEntity>,
  ) {}

  async upsertItem(item: IImageVariant) {
    const record = await this.cloudflareVariantRepository.findOneBy({ code: item.code });

    if (!record) {
      return this.cloudflareVariantRepository.save(item);
    }

    return this.cloudflareVariantRepository.save({
      ...record,
      ...item,
    });
  }

  seed() {
    const tasks = variantItems.map((item) => this.upsertItem(item));
    return Promise.all(tasks);
  }

  drop() {
    return this.cloudflareVariantRepository.delete({});
  }
}
