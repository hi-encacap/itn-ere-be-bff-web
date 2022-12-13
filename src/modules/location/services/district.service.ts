import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { slugify } from 'src/common/utils/helpers.util';
import { DeepPartial, Repository } from 'typeorm';
import { PROVINCE_ERROR_CODE } from '../constants/error.constant';
import { DistrictWebsiteEntity } from '../entities/district-website.entity';
import { DistrictEntity } from '../entities/district.entity';
import { GHNService } from './ghn.service';
import { ProvinceService } from './province.service';

@Injectable()
export class DistrictService extends BaseService {
  constructor(
    @InjectRepository(DistrictEntity)
    private readonly districtRepository: Repository<DistrictEntity>,

    private readonly ghnService: GHNService,
    private readonly provinceService: ProvinceService,
  ) {
    super();
  }

  async getByGHNId(id: number, createIfNotExists = false) {
    const item = await this.queryBuilder.andWhere('district.ghnRefId = :id', { id }).getOne();

    if (!item && !createIfNotExists) {
      throw new NotFoundException(PROVINCE_ERROR_CODE.NOT_EXISTS);
    }

    if (item) {
      return item;
    }

    return this.create({ ghnRefId: id });
  }

  async create(body: DeepPartial<DistrictEntity>) {
    const district = await this.ghnService.getDistrictById(body.ghnRefId);
    const province = await this.provinceService.getByGHNId(district.provinceId, true);

    return this.districtRepository.save({
      code: slugify(district.name),
      name: district.name,
      ghnRefId: district.id,
      provinceCode: province.code,
    });
  }

  private get queryBuilder() {
    return this.districtRepository
      .createQueryBuilder('district')
      .leftJoin(DistrictWebsiteEntity, 'districtWebsite', 'district.code = districtWebsite.districtCode');
  }
}
