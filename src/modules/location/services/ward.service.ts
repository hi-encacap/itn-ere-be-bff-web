import { IREUser, slugify } from '@encacap-group/types/dist/re';
import { Inject, Injectable, UnprocessableEntityException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { WardListQueryDto } from '../dtos/ward-list-query.dto';
import { WardWebsiteCreateBodyDto } from '../dtos/ward-website-create-body.dto';
import { DistrictEntity } from '../entities/district.entity';
import { ProvinceEntity } from '../entities/province.entity';
import { WardWebsiteEntity } from '../entities/ward-website.entity';
import { WardEntity } from '../entities/ward.entity';
import { GHNService } from './ghn.service';
import { WardWebsiteService } from './ward-website.service';

@Injectable()
export class WardService extends BaseService {
  constructor(
    @InjectRepository(WardEntity) private readonly provinceRepository: Repository<WardEntity>,
    @Inject(forwardRef(() => GHNService))
    private readonly ghnService: GHNService,

    private readonly wardWebsiteService: WardWebsiteService,
  ) {
    super();
  }

  async get(query: FindOptionsWhere<WardEntity>, throwError = true) {
    const queryBuilder = this.queryBuilder;

    if (query.code) {
      queryBuilder.andWhere('ward.code = :code', { code: query.code });
    }

    if (query.ghnRefId) {
      queryBuilder.andWhere('ward.ghnRefId = :ghnRefId', { ghnRefId: query.ghnRefId });
    }

    if (query.websiteId) {
      queryBuilder.andWhere('wardWebsite.websiteId = :websiteId', { websiteId: query.websiteId });
    }

    const record = await queryBuilder.getOne();

    if (!record && throwError) {
      throw new UnprocessableEntityException(LOCATION_ERROR_CODE.WARD_NOT_EXISTS);
    }

    return record;
  }

  getAll(query: WardListQueryDto) {
    let queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder.andWhere('wardWebsite.websiteId = :websiteId', { websiteId: query.websiteId });
    }

    if (query.provinceCodes) {
      queryBuilder = this.setInOperator(queryBuilder, query.provinceCodes, 'district.province.code');
    }

    if (query.districtCode) {
      query.districtCodes = [query.districtCode, ...(query.districtCodes ?? [])];
    }

    if (query.districtCodes) {
      queryBuilder = this.setInOperator(queryBuilder, query.districtCodes, 'district.code');
    }

    queryBuilder = this.setSorting(queryBuilder, query, 'ward');
    queryBuilder = this.setPagination(queryBuilder, query);

    return this.getManyAndCount(queryBuilder, query);
  }

  async create(data: WardWebsiteCreateBodyDto, user?: IREUser) {
    const existedRecord = await this.get({ ghnRefId: data.ghnRefId }, false);

    if (existedRecord) {
      await this.wardWebsiteService.create(existedRecord.code, user.websiteId);

      return existedRecord;
    }

    const ward = await this.ghnService.getWard(data.districtCode, data.ghnRefId);
    const record = await this.provinceRepository.save({
      ...ward,
      code: slugify(ward.name),
      countryCode: 'viet-nam',
    } as DeepPartial<WardEntity>);

    if (user) {
      await this.wardWebsiteService.create(record.code, user.websiteId);
    }

    return this.get({ code: record.code });
  }

  private get queryBuilder() {
    return this.provinceRepository
      .createQueryBuilder('ward')
      .leftJoin(WardWebsiteEntity, 'wardWebsite', 'wardWebsite.wardCode = ward.code')
      .leftJoinAndMapOne('ward.district', DistrictEntity, 'district', 'district.code = ward.districtCode')
      .leftJoinAndMapOne(
        'district.province',
        ProvinceEntity,
        'province',
        'province.code = district.provinceCode',
      )
      .leftJoinAndMapOne('ward.website', WebsiteEntity, 'website', 'website.id = wardWebsite.websiteId');
  }
}
