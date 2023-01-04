import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ESTATE_STATUS_ENUM, IUser } from 'encacap/dist/re';
import { isObject, pickBy } from 'lodash';
import { BaseService } from 'src/base/base.service';
import { IAlgoliaEstate } from 'src/modules/algolia/interfaces/algolia.interface';
import { AlgoliaEstateService } from 'src/modules/algolia/services/algolia-estate.service';
import { CategoryPropertyEntity } from 'src/modules/category/entities/category-property.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { CloudflareVariantWebsiteEntity } from 'src/modules/cloudflare/entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ESTATE_ERROR_CODE_ENUM } from '../constants/estate-error-code.constant';
import { EstateCreateBodyDto } from '../dtos/estate-create-body.dto';
import { EstateListQueryDto } from '../dtos/estate-list-query.dto';
import { EstateImageEntity } from '../entities/estate-image.entity';
import { EstateEntity } from '../entities/estate.entity';
import { EstateImageService } from './estate-image.service';
import { EstatePropertyService } from './estate-property.service';

@Injectable()
export class EstateService extends BaseService {
  constructor(
    @InjectRepository(EstateEntity) private readonly estateRepository: Repository<EstateEntity>,
    private readonly estatePropertyService: EstatePropertyService,
    private readonly estateImageService: EstateImageService,
    private readonly cloudflareImageService: CloudflareImageService,
    private readonly algoliaEstateService: AlgoliaEstateService,
  ) {
    super();
  }

  async create(body: EstateCreateBodyDto, user?: IUser) {
    const { id: estateId, status } = await this.estateRepository.save({
      ...pickBy(body, (value) => !isObject(value)),
      websiteId: user?.websiteId,
      status: body.status ?? ESTATE_STATUS_ENUM.DRAFT,
    });
    const { properties, imageIds } = body;

    await this.estatePropertyService.bulkSave(properties, estateId);
    await this.estateImageService.bulkSave(imageIds, estateId);

    if (status == ESTATE_STATUS_ENUM.PUBLISHED) {
      await this.saveToAlgolia(estateId);
    }

    return this.get({ id: estateId });
  }

  async get(query: FindOptionsWhere<EstateEntity>) {
    const record = await this.queryBuilder.where(query).getOne();

    if (!record) {
      throw new NotFoundException(ESTATE_ERROR_CODE_ENUM.ESTATE_NOT_EXIST);
    }

    return this.cloudflareImageService.mapVariantToImages(record, 'images');
  }

  async getAll(query: EstateListQueryDto) {
    let queryBuilder = this.queryBuilder;

    queryBuilder = this.setFilter(queryBuilder, query, 'estate', 'status', 'status');

    const [records, total] = await queryBuilder.getManyAndCount();

    let formattedRecords = this.cloudflareImageService.mapVariantToImages(records, 'images');
    formattedRecords = this.cloudflareImageService.mapVariantToImage(records, 'avatar');

    return this.generateGetAllResponse(formattedRecords, total, query);
  }

  private get queryBuilder() {
    return (
      this.estateRepository
        .createQueryBuilder('estate')
        // Properties
        .leftJoinAndSelect('estate.properties', 'property', 'property.estateId = estate.id')
        .leftJoinAndMapOne(
          'property.categoryProperty',
          CategoryPropertyEntity,
          'categoryProperty',
          'categoryProperty.id = property.categoryPropertyId',
        )
        // Images
        .leftJoin(EstateImageEntity, 'image', 'image.estateId = estate.id')
        .leftJoinAndMapMany(
          'estate.images',
          CloudflareImageEntity,
          'cloudflareImage',
          'cloudflareImage.id = image.imageId',
        )
        .leftJoin(
          CloudflareVariantWebsiteEntity,
          'variantWebsite',
          'variantWebsite.websiteId = estate.websiteId',
        )
        .leftJoinAndMapMany(
          'cloudflareImage.variants',
          CloudflareVariantEntity,
          'variant',
          'variant.code = variantWebsite.variantCode',
        )
        // Locations
        .leftJoinAndSelect('estate.province', 'province')
        .leftJoinAndSelect('estate.district', 'district')
        .leftJoinAndSelect('estate.ward', 'ward')

        .leftJoinAndSelect('estate.website', 'website')
        .leftJoinAndSelect('estate.quarter', 'quarter')
        .leftJoinAndSelect('estate.category', 'category')
        // Avatar
        .leftJoinAndSelect('estate.avatar', 'avatar')
    );
  }

  private async saveToAlgolia(id: number) {
    const estate = await this.get({
      id,
    });

    const data: IAlgoliaEstate = {
      objectID: String(estate.id),
      provinceName: estate.province?.name,
      districtName: estate.district?.name,
      wardName: estate.ward?.name,
      address: estate.address,
      title: estate.title,
      customId: estate.customId,
      description: estate.description,
      categoryName: estate.category?.name,
      price: estate.price,
      area: estate.area,
      contactName: estate.contact?.name,
      propertyValues: estate.properties.map((property) => property.value),
      quarterName: estate.quarter?.name,
    };

    this.algoliaEstateService.save(data);
  }
}
