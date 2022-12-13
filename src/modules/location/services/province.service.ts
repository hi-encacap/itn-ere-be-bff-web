import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { slugify } from 'src/common/utils/helpers.util';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { PROVINCE_ERROR_CODE } from '../constants/error.constant';
import { ProvinceWebsiteListQueryDto } from '../dto/province-website-list-query.dto';
import { ProvinceWebsiteEntity } from '../entities/province-website.entity';
import { ProvinceEntity } from '../entities/province.entity';
import { GHNService } from './ghn.service';

@Injectable()
export class ProvinceService extends BaseService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,

    private readonly ghnService: GHNService,
  ) {
    super();
  }

  getAll(query: ProvinceWebsiteListQueryDto) {
    const queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder.andWhere('provinceWebsite.websiteId = :websiteId', { websiteId: query.websiteId });
    }

    return this.getManyAndCount(queryBuilder, query);
  }

  async get(query: FindOptionsWhere<ProvinceEntity>) {
    const province = await this.queryBuilder.andWhere(query).getOne();

    if (!province) {
      throw new NotFoundException(PROVINCE_ERROR_CODE.NOT_EXISTS);
    }

    return province;
  }

  async getByGHNId(id: number, createIfNotExists = false) {
    const province = await this.queryBuilder.andWhere('province.ghnRefId = :id', { id }).getOne();

    if (!province && !createIfNotExists) {
      throw new NotFoundException(PROVINCE_ERROR_CODE.NOT_EXISTS);
    }

    if (province) {
      return province;
    }

    return this.create({ ghnRefId: id });
  }

  async create(body: DeepPartial<ProvinceEntity>) {
    const city = await this.ghnService.getProvinceById(body.ghnRefId);

    return this.provinceRepository.save({
      code: slugify(city.name),
      name: city.name,
      ghnRefId: city.id,
    });
  }

  private get queryBuilder() {
    return this.provinceRepository
      .createQueryBuilder('province')
      .leftJoin(ProvinceWebsiteEntity, 'provinceWebsite', 'province.code = provinceWebsite.provinceCode');
  }
}
