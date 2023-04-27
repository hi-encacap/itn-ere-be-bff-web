import { CONFIG_CODE_ENUM, CONFIG_GROUP_ENUM, CONFIG_TYPE_ENUM, IConfig } from '@encacap-group/types/dist/re';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { ConfigEntity } from 'src/modules/configs/entities/config.entity';
import { Repository } from 'typeorm';

const configItems: Partial<IConfig[]> = [
  {
    code: CONFIG_CODE_ENUM.SITE_NAME,
    defaultValue: 'Encacap',
    group: CONFIG_GROUP_ENUM.SITE,
    type: CONFIG_TYPE_ENUM.STRING,
  },
  {
    code: CONFIG_CODE_ENUM.SITE_PHONE_NUMBER,
    defaultValue: '0123456789',
    group: CONFIG_GROUP_ENUM.SITE,
    type: CONFIG_TYPE_ENUM.STRING,
  },
  {
    code: CONFIG_CODE_ENUM.SITE_ZALO,
    defaultValue: '0123456789',
    group: CONFIG_GROUP_ENUM.SITE,
    type: CONFIG_TYPE_ENUM.STRING,
  },
  {
    code: CONFIG_CODE_ENUM.SITE_FACEBOOK,
    defaultValue: 'https://www.facebook.com/encacap',
    group: CONFIG_GROUP_ENUM.SITE,
    type: CONFIG_TYPE_ENUM.STRING,
  },
  {
    code: CONFIG_CODE_ENUM.SITE_YOUTUBE,
    defaultValue: 'https://www.youtube.com/encacap',
    group: CONFIG_GROUP_ENUM.SITE,
    type: CONFIG_TYPE_ENUM.STRING,
  },
];

@Injectable()
export class ConfigSeeder implements Seeder {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {}

  async upsertItem(item: Partial<IConfig>) {
    const record = await this.configRepository.findOneBy({ code: item.code });

    if (!record) {
      return this.configRepository.save(item);
    }

    return this.configRepository.save({
      ...record,
      ...item,
    });
  }

  async seed() {
    const promises = configItems.map((item) => this.upsertItem(item));

    return Promise.all(promises);
  }

  async drop() {
    const records = await this.configRepository.find();

    return this.configRepository.remove(records);
  }
}
