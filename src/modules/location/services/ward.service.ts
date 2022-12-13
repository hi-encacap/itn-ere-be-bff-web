import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { slugify } from 'src/common/utils/helpers.util';
import { DeepPartial, Repository } from 'typeorm';
import { WARD_ERROR_CODE } from '../constants/error.constant';
import { WardWebsiteEntity } from '../entities/ward-website.entity';
import { WardEntity } from '../entities/ward.entity';
import { DistrictService } from './district.service';
import { GHNService } from './ghn.service';

@Injectable()
export class WardService extends BaseService {
  constructor(
    @InjectRepository(WardEntity)
    private readonly wardRepository: Repository<WardEntity>,

    private readonly ghnService: GHNService,
    private readonly districtService: DistrictService,
  ) {
    super();
  }

  async getByGHNId(id: number, districtGhnRefId: number, createIfNotExists = false) {
    const ward = await this.queryBuilder.andWhere('ward.ghnRefId = :id', { id }).getOne();

    if (!ward && !createIfNotExists) {
      throw new NotFoundException(WARD_ERROR_CODE.NOT_EXISTS);
    }

    if (ward) {
      return ward;
    }

    return this.create({ ghnRefId: id, districtGhnRefId });
  }

  async create(body: DeepPartial<WardEntity>) {
    const ward = await this.ghnService.getWardById(body.ghnRefId, body.districtGhnRefId);
    const district = await this.districtService.getByGHNId(ward.districtId, true);

    console.log(district);

    return this.wardRepository.save({
      code: slugify(ward.name),
      name: ward.name,
      ghnRefId: ward.id,
      districtCode: district.code,
    });
  }

  private get queryBuilder() {
    return this.wardRepository
      .createQueryBuilder('ward')
      .leftJoin(WardWebsiteEntity, 'wardWebsite', 'ward.code = wardWebsite.wardCode');
  }
}
