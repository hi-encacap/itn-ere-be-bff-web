import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'encacap/dist/re';
import { Seeder } from 'nestjs-seeder';
import { CategoryGroupWebsiteEntity } from 'src/modules/category/entities/category-group-website.entity';
import { CategoryGroupEntity } from 'src/modules/category/entities/category-group.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryGroupWebsiteSeeder implements Seeder {
  private rootUser: IUser;

  constructor(
    @InjectRepository(CategoryGroupEntity)
    private readonly categoryGroupRepository: Repository<CategoryGroupEntity>,
    @InjectRepository(WebsiteEntity)
    private readonly websiteRepository: Repository<WebsiteEntity>,
    @InjectRepository(CategoryGroupWebsiteEntity)
    private readonly categoryGroupWebsiteRepository: Repository<CategoryGroupWebsiteEntity>,
  ) {}

  async seed() {
    const categoryGroups = await this.categoryGroupRepository.find();
    const websites = await this.websiteRepository.find();

    const categoryGroupWebsites = categoryGroups.reduce((acc, categoryGroup) => {
      const categoryGroupWebsite = websites.map((website) => {
        return {
          categoryGroupCode: categoryGroup.code,
          websiteId: website.id,
        };
      });

      return [...acc, ...categoryGroupWebsite];
    }, []);

    return this.categoryGroupWebsiteRepository.save(categoryGroupWebsites);
  }

  drop() {
    return this.categoryGroupRepository.delete({});
  }
}
