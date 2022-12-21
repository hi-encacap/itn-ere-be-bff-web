import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { DeepPartial, Repository } from 'typeorm';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { ProvinceCreateBodyDto } from '../dtos/province-create-body.dto';
import { ProvinceListQueryDto } from '../dtos/province-list-query.dto';
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

  async getByCode(code: string) {
    const record = await this.provinceRepository.findOneBy({ code });

    if (!record) {
      throw new Error(LOCATION_ERROR_CODE.PROVINCE_NOT_EXISTS);
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

  async create(data: ProvinceCreateBodyDto, user?: IUser) {
    const province = await this.ghnService.getProvince(data.ghnRefId);
    const record = await this.provinceRepository.save({
      ...data,
      code: province.code,
    } as DeepPartial<ProvinceEntity>);

    if (user) {
      await this.provinceWebsiteService.create(province.code, user.websiteId);
    }

    return record;
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
