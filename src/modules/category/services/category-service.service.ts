import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { slugify } from 'src/common/utils/helpers.util';
import { CloudflareVariantWebsiteEntity } from 'src/modules/cloudflare/entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private readonly cloudflareImageService: CloudflareImageService,
  ) {}

  getOne(query: FindOptionsWhere<CategoryEntity>) {
    return this.getQueryBuilder().where(query).getOne();
  }

  async getAll(query: FindOptionsWhere<CategoryEntity>): Promise<CategoryEntity[]> {
    const categories = await this.getQueryBuilder().where(query).getMany();

    return categories.map((category: CategoryEntity) => {
      const { thumbnail } = category;
      const { id: thumbnailId } = thumbnail;

      thumbnail.urls = this.cloudflareImageService.getURLsFromVariants(thumbnailId, thumbnail.variants);

      return {
        ...category,
      } as CategoryEntity;
    });
  }

  create(body: CreateCategoryDto, user: IUser) {
    const { code } = body;

    if (!code) {
      body.code = slugify(body.name);
    }

    return this.categoryRepository.save({
      ...body,
      userId: user.id,
    });
  }

  private getQueryBuilder() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.user', 'user')
      .leftJoinAndSelect('category.thumbnail', 'thumbnail')
      .leftJoin(UserEntity, 'thumbnail_user', 'thumbnail_user.id = thumbnail.user_id')
      .leftJoin(
        WebsiteEntity,
        'thumbnail_user_website',
        'thumbnail_user_website.id = thumbnail_user.website_id',
      )
      .leftJoin(
        CloudflareVariantWebsiteEntity,
        'thumbnail_variant_website',
        'thumbnail_variant_website.websiteId = thumbnail_user_website.id',
      )
      .leftJoinAndMapMany(
        'thumbnail.variants',
        CloudflareVariantEntity,
        'thumbnail_variant',
        'thumbnail_variant.id = thumbnail_variant_website.variant_id',
      )
      .leftJoinAndSelect('category.categoryGroup', 'categoryGroup');
  }
}
