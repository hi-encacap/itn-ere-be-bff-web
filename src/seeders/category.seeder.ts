import {
  ACBUILDING_CATEGORY_CODE_ENUM,
  CATEGORY_GROUP_ENUM,
  ICategory,
  WEBSITE_DOMAIN_ENUM,
} from '@encacap-group/types/dist/re';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Repository } from 'typeorm';

interface ICategorySeeder extends Partial<ICategory> {
  websiteDomain: WEBSITE_DOMAIN_ENUM;
}

const items: ICategorySeeder[] = [
  {
    categoryGroupCode: CATEGORY_GROUP_ENUM.POST,
    name: 'Sản phẩm',
    code: ACBUILDING_CATEGORY_CODE_ENUM.PRODUCT,
    thumbnailId: '23051313D355F8BDF84F51B49D680136825BA0', // TODO: Need update.
    websiteDomain: WEBSITE_DOMAIN_ENUM.ACBUILDING_DEV,
  },
  {
    categoryGroupCode: CATEGORY_GROUP_ENUM.POST,
    name: 'Dự án',
    code: ACBUILDING_CATEGORY_CODE_ENUM.PROJECT,
    thumbnailId: '2305133777EF8AFD314C9D86B6A157D04E0F87',
    websiteDomain: WEBSITE_DOMAIN_ENUM.ACBUILDING_DEV,
  },
  {
    categoryGroupCode: CATEGORY_GROUP_ENUM.POST,
    name: 'Dịch vụ',
    code: ACBUILDING_CATEGORY_CODE_ENUM.SERVICE,
    thumbnailId: '2305137FB2D74E78A9412BACEF652A5916277B',
    websiteDomain: WEBSITE_DOMAIN_ENUM.ACBUILDING_DEV,
  },
];

@Injectable()
export class CategorySeeder implements Seeder {
  constructor(
    @InjectRepository(WebsiteEntity)
    private readonly websiteRepository: Repository<WebsiteEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async upsertItem(item: ICategorySeeder) {
    const website = await this.websiteRepository.findOneBy({ url: item.websiteDomain });
    const record = await this.categoryRepository.findOneBy({ code: item.code, websiteId: website.id });
    let updatedItem = { ...item, websiteId: website.id };

    if (record) {
      updatedItem = { ...record, ...item };
    }

    return this.categoryRepository.save(updatedItem);
  }

  seed() {
    const tasks = items.map((item) => this.upsertItem(item));
    return Promise.all(tasks);
  }

  drop() {
    return this.categoryRepository.delete({});
  }
}
