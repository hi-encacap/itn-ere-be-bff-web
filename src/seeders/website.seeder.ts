import { IWebsite, WEBSITE_DOMAIN_ENUM } from '@encacap-group/common/dist/re';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Repository } from 'typeorm';

export const websiteItems: Array<Partial<IWebsite>> = [
  {
    name: 'Encacap RE',
    url: WEBSITE_DOMAIN_ENUM.ENCACAP_RE,
    description: 'This is the supper root website. It can be used to manage all the websites.',
  },
  {
    name: 'DEV - BaolocRE - Bất động sản Bảo Lộc',
    url: WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV,
    description: 'This is the website for BaolocRE.',
  },
  {
    name: 'BaolocRE - Bất động sản Bảo Lộc',
    url: WEBSITE_DOMAIN_ENUM.BAOLOCRE,
    description: 'This is the website for BaolocRE.',
  },
  {
    name: 'DEV - Công ty TNHH xây dựng An Cường',
    url: WEBSITE_DOMAIN_ENUM.ACBUILDING_DEV,
    description:
      'Chuyên thi công xây dựng nhà dân dụng, nhà tiền chế, kinh doanh vật liệu gỗ, nhựa, sắt, thép...',
  },
  {
    name: 'Công ty TNHH xây dựng An Cường',
    url: WEBSITE_DOMAIN_ENUM.ACBUILDING,
    description:
      'Chuyên thi công xây dựng nhà dân dụng, nhà tiền chế, kinh doanh vật liệu gỗ, nhựa, sắt, thép...',
  },
];

@Injectable()
export class WebsiteSeeder implements Seeder {
  constructor(
    @InjectRepository(WebsiteEntity) private readonly websiteRepository: Repository<WebsiteEntity>,
  ) {}

  async upsertItem(item: Partial<IWebsite>) {
    const record = await this.websiteRepository.findOneBy({ url: item.url });

    if (record) {
      return this.websiteRepository.update(record.id, item);
    }

    return this.websiteRepository.save(item);
  }

  seed() {
    const seedTasks = websiteItems.map((item) => this.upsertItem(item));
    return Promise.all(seedTasks);
  }

  drop() {
    return this.websiteRepository.delete({});
  }
}
