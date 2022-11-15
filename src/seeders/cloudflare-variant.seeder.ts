import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { CloudflareVariantFitEnum } from 'src/modules/cloudflare/constants/cloudflare-variant-fit.constant';
import { CloudflareVariantWebsiteEntity } from 'src/modules/cloudflare/entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { ICloudflareVariant } from 'src/modules/cloudflare/interfaces/cloudflare-variant.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Repository } from 'typeorm';

const variantItems: ICloudflareVariant[] = [
  {
    id: 'public',
    fit: CloudflareVariantFitEnum.SCALE_DOWN,
    width: null,
    height: null,
    isDefault: true,
  },
];

@Injectable()
export class CloudflareVariantSeeder implements Seeder {
  private websites: WebsiteEntity[];

  constructor(
    @InjectRepository(CloudflareVariantEntity)
    private readonly cloudflareVariantRepository: Repository<CloudflareVariantEntity>,
    @InjectRepository(CloudflareVariantWebsiteEntity)
    private readonly cloudflareVariantWebsiteRepository: Repository<CloudflareVariantWebsiteEntity>,
    @InjectRepository(WebsiteEntity)
    private readonly websiteRepository: Repository<WebsiteEntity>,
  ) {}

  async upsertItem(item: ICloudflareVariant) {
    let record = await this.cloudflareVariantRepository.findOneBy({ id: item.id });

    if (!record) {
      record = await this.cloudflareVariantRepository.save(item);
    }

    const { id } = record;

    const variantWebsites = this.websites.map((website) => ({
      variantId: id,
      websiteId: website.id,
    }));

    await this.cloudflareVariantWebsiteRepository.delete({ variantId: id });
    await this.cloudflareVariantWebsiteRepository.save(variantWebsites);

    return this.cloudflareVariantRepository.save(item);
  }

  async seed() {
    this.websites = await this.websiteRepository.find();
    const tasks = variantItems.map((item) => this.upsertItem(item));
    return Promise.all(tasks);
  }

  async drop() {
    await this.cloudflareVariantWebsiteRepository.delete({});
    return this.cloudflareVariantRepository.delete({});
  }

  private readonly getWebsites = async () => {
    if (!this.websites) {
      this.websites = await this.websiteRepository.find();
    }

    return this.websites;
  };
}
