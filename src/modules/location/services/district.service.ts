import { forwardRef, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'encacap/dist/re';
import { BaseService } from 'src/base/base.service';
import { slugify } from 'src/common/utils/helpers.util';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { DistrictListQueryDto } from '../dtos/district-list-query.dto';
import { DistrictWebsiteCreateBodyDto } from '../dtos/district-website-create-body.dto';
import { DistrictWebsiteEntity } from '../entities/district-website.entity';
import { DistrictEntity } from '../entities/district.entity';
import { ProvinceEntity } from '../entities/province.entity';
import { DistrictWebsiteService } from './district-website.service';
import { GHNService } from './ghn.service';

@Injectable()
export class DistrictService extends BaseService {
  constructor(
    @InjectRepository(DistrictEntity) private readonly districtRepository: Repository<DistrictEntity>,
    @Inject(forwardRef(() => GHNService))
    private readonly ghnService: GHNService,
    private readonly districtWebsiteService: DistrictWebsiteService,
  ) {
    super();
  }

  get(query: FindOptionsWhere<DeepPartial<DistrictEntity>>, throwError = false): Promise<DistrictEntity> {
    const record = this.queryBuilder.where(query).getOne();

    if (!record && throwError) {
      throw new UnprocessableEntityException(LOCATION_ERROR_CODE.DISTRICT_NOT_EXISTS);
    }

    return record;
  }

  getAll(query: DistrictListQueryDto) {
    let queryBuilder = this.queryBuilder;

    if (query.provinceCode) {
      query.provinceCodes = [query.provinceCode, ...(query.provinceCodes ?? [])];
    }

    if (query.provinceCodes) {
      queryBuilder = this.setInOperator(queryBuilder, query.provinceCodes, 'province.code');
    }

    if (query.websiteId) {
      queryBuilder.andWhere('districtWebsite.websiteId = :websiteId', { websiteId: query.websiteId });
    }

    const { orderDirection } = query;
    let { orderBy } = query;

    if (orderBy === 'provinceName') {
      orderBy = 'province.name';
    } else {
      orderBy = `district.${orderBy ?? 'createdAt'}`;
    }

    queryBuilder.orderBy(orderBy, orderDirection);
    queryBuilder = this.setPagination(queryBuilder, query);

    return this.getManyAndCount(queryBuilder, query);
  }

  async create(data: DistrictWebsiteCreateBodyDto, user?: IUser) {
    const existedRecord = await this.get({ ghnRefId: data.ghnRefId }, false);

    if (existedRecord) {
      await this.districtWebsiteService.create(existedRecord.code, user.websiteId);

      return existedRecord;
    }

    const district = await this.ghnService.getDistrict(data.provinceCode, data.ghnRefId);
    const record = await this.districtRepository.save({
      ...district,
      code: slugify(district.name),
      countryCode: 'viet-nam',
    } as DeepPartial<DistrictEntity>);

    if (user) {
      await this.districtWebsiteService.create(record.code, user.websiteId);
    }

    return this.get({ code: record.code });
  }

  private get queryBuilder() {
    return this.districtRepository
      .createQueryBuilder('district')
      .leftJoin(DistrictWebsiteEntity, 'districtWebsite', 'district.code = districtWebsite.districtCode')
      .leftJoinAndMapOne(
        'district.province',
        ProvinceEntity,
        'province',
        'district.provinceCode = province.code',
      )
      .leftJoinAndMapOne(
        'district.website',
        WebsiteEntity,
        'website',
        'districtWebsite.websiteId = website.id',
      );
  }
}
