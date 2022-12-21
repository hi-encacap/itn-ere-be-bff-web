import { Inject, Injectable, UnprocessableEntityException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { slugify } from 'src/common/utils/helpers.util';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { ProvinceListQueryDto } from '../dtos/province-list-query.dto';
import { ProvinceWebsiteCreateBodyDto } from '../dtos/province-website-create-body.dto';
import { ProvinceWebsiteEntity } from '../entities/province-website.entity';
import { ProvinceEntity } from '../entities/province.entity';
import { GHNService } from './ghn.service';
import { ProvinceWebsiteService } from './province-website.service';

@Injectable()
export class ProvinceService extends BaseService {
  constructor(
    @InjectRepository(ProvinceEntity) private readonly provinceRepository: Repository<ProvinceEntity>,
    @Inject(forwardRef(() => GHNService))
    private readonly ghnService: GHNService,

    private readonly provinceWebsiteService: ProvinceWebsiteService,
  ) {
    super();
  }

  async get(query: FindOptionsWhere<ProvinceEntity>, throwError = true) {
    const queryBuilder = this.queryBuilder;

    if (query.code) {
      queryBuilder.andWhere('province.code = :code', { code: query.code });
    }

    if (query.ghnRefId) {
      queryBuilder.andWhere('province.ghnRefId = :ghnRefId', { ghnRefId: query.ghnRefId });
    }

    const record = await queryBuilder.getOne();

    if (!record && throwError) {
      throw new UnprocessableEntityException(LOCATION_ERROR_CODE.PROVINCE_NOT_EXISTS);
    }

    return record;
  }

  getAll(query: ProvinceListQueryDto) {
    const { websiteId } = query;

    const queryBuilder = this.queryBuilder;

    if (websiteId) {
      queryBuilder.andWhere('provinceWebsite.websiteId = :websiteId', { websiteId });
    }

    return this.getManyAndCount(queryBuilder, query);
  }

  async create(data: ProvinceWebsiteCreateBodyDto, user?: IUser) {
    const existedRecord = await this.get({ ghnRefId: data.ghnRefId }, false);

    if (existedRecord) {
      await this.provinceWebsiteService.create(existedRecord.code, user.websiteId);

      return existedRecord;
    }

    const province = await this.ghnService.getProvince(data.ghnRefId);
    const record = await this.provinceRepository.save({
      ...province,
      code: slugify(province.name),
      countryCode: 'viet-nam',
    } as DeepPartial<ProvinceEntity>);

    if (user) {
      await this.provinceWebsiteService.create(record.code, user.websiteId);
    }

    return this.get({ code: record.code });
  }

  private get queryBuilder() {
    return this.provinceRepository
      .createQueryBuilder('province')
      .leftJoin(ProvinceWebsiteEntity, 'provinceWebsite', 'provinceWebsite.provinceCode = province.code')
      .leftJoinAndMapOne(
        'province.website',
        WebsiteEntity,
        'website',
        'website.id = provinceWebsite.websiteId',
      );
  }
}
