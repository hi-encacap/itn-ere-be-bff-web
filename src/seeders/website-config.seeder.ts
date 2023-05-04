import {
  BAOLOCRE_SITE_CONFIG_CODE_ENUM,
  CONFIG_GROUP_ENUM,
  CONFIG_TYPE_ENUM,
  IConfig,
} from '@encacap-group/types/dist/re';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Seeder } from 'nestjs-seeder';
import { WebsiteConfigEntity } from 'src/modules/configs/entities/website-config,entity';
import { WEBSITE_DOMAIN_ENUM } from 'src/modules/website/constants/website-domain.constant';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Repository } from 'typeorm';

interface IConfigSeeder extends Partial<IConfig> {
  websiteDomain: string;
}

const websiteConfigItem: IConfigSeeder[] = [
  {
    code: BAOLOCRE_SITE_CONFIG_CODE_ENUM.NAME,
    value: 'DEV - Bất động sản nghỉ dưỡng Bảo Lộc',
    type: CONFIG_TYPE_ENUM.STRING,
    group: CONFIG_GROUP_ENUM.SITE,
    websiteDomain: WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV,
  },
  {
    code: BAOLOCRE_SITE_CONFIG_CODE_ENUM.PHONE_NUMBER,
    value: '0123456789',
    type: CONFIG_TYPE_ENUM.STRING,
    group: CONFIG_GROUP_ENUM.SITE,
    websiteDomain: WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV,
  },
  {
    code: BAOLOCRE_SITE_CONFIG_CODE_ENUM.ZALO,
    value: '0123456789',
    type: CONFIG_TYPE_ENUM.STRING,
    group: CONFIG_GROUP_ENUM.SITE,
    websiteDomain: WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV,
  },
  {
    code: BAOLOCRE_SITE_CONFIG_CODE_ENUM.FACEBOOK,
    value: 'https://www.facebook.com/encacap',
    type: CONFIG_TYPE_ENUM.STRING,
    group: CONFIG_GROUP_ENUM.SITE,
    websiteDomain: WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV,
  },
  {
    code: BAOLOCRE_SITE_CONFIG_CODE_ENUM.YOUTUBE,
    value: 'https://www.youtube.com/encacap',
    type: CONFIG_TYPE_ENUM.STRING,
    group: CONFIG_GROUP_ENUM.SITE,
    websiteDomain: WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV,
  },
  {
    code: BAOLOCRE_SITE_CONFIG_CODE_ENUM.ADDRESS,
    value: '2023 Nguyễn Khắc Khánh, Phường Enacap, Quận 1, TP. Hồ Chí Minh',
    type: CONFIG_TYPE_ENUM.STRING,
    group: CONFIG_GROUP_ENUM.SITE,
    websiteDomain: WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV,
  },
  {
    code: BAOLOCRE_SITE_CONFIG_CODE_ENUM.HOMEPAGE_SLIDER_IMAGES,
    value: JSON.stringify([]),
    type: CONFIG_TYPE_ENUM.STRING,
    group: CONFIG_GROUP_ENUM.SITE,
    websiteDomain: WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV,
  },
];

@Injectable()
export class WebsiteConfigSeeder implements Seeder {
  constructor(
    @InjectRepository(WebsiteEntity)
    private readonly websiteRepository: Repository<WebsiteEntity>,
    @InjectRepository(WebsiteConfigEntity)
    private readonly websiteConfigRepository: Repository<WebsiteConfigEntity>,
  ) {}

  async upsertItem(item: IConfigSeeder) {
    const website = await this.websiteRepository.findOneBy({ url: item.websiteDomain });

    if (!website) {
      return undefined;
    }

    const record = await this.websiteConfigRepository.findOneBy({
      websiteId: website.id,
      code: item.code,
    });

    if (record) {
      return this.websiteConfigRepository.update(record.id, omit(item, 'websiteDomain'));
    }

    return this.websiteConfigRepository.save({
      ...omit(item, 'websiteDomain'),
      websiteId: website.id,
    });
  }

  seed() {
    const seedTasks = websiteConfigItem.map((item) => this.upsertItem(item));
    return Promise.all(seedTasks);
  }

  drop() {
    return this.websiteConfigRepository.delete({});
  }
}
