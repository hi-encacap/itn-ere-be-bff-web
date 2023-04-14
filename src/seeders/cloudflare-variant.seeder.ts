import { DEFAULT_CLOUDFLARE_VARIANT_ENUM } from '@encacap-group/types/dist/re';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { CLOUDFLARE_VARIANT_FIT_ENUM } from 'src/modules/cloudflare/constants/cloudflare-variant.constant';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { ICloudflareVariant } from 'src/modules/cloudflare/interfaces/cloudflare-variant.interface';
import { Repository } from 'typeorm';

const variantItems: ICloudflareVariant[] = [
  {
    code: DEFAULT_CLOUDFLARE_VARIANT_ENUM.PUBLIC,
    fit: CLOUDFLARE_VARIANT_FIT_ENUM.SCALE_DOWN,
    width: null,
    height: null,
    isDefault: true,
  },
  {
    code: DEFAULT_CLOUDFLARE_VARIANT_ENUM.SMALL,
    fit: CLOUDFLARE_VARIANT_FIT_ENUM.SCALE_DOWN,
    width: 96,
    height: null,
    isDefault: true,
  },
];

@Injectable()
export class CloudflareVariantSeeder implements Seeder {
  constructor(
    @InjectRepository(CloudflareVariantEntity)
    private readonly cloudflareVariantRepository: Repository<CloudflareVariantEntity>,
  ) {}

  async upsertItem(item: ICloudflareVariant) {
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
