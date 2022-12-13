import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DistrictWebsiteCreateBodyDto } from '../dto/district-website-create-body.dto';
import { DistrictWebsiteListQueryDto } from '../dto/district-website-list-query.dto';
import { DistrictWebsiteEntity } from '../entities/district-website.entity';
import { DistrictEntity } from '../entities/district.entity';
import { ProvinceEntity } from '../entities/province.entity';
import { DistrictService } from './district.service';

@Injectable()
export class DistrictWebsiteService extends BaseService {
  constructor(
    @InjectRepository(DistrictWebsiteEntity)
    private readonly districtWebsiteRepository: Repository<DistrictWebsiteEntity>,

    private readonly districtService: DistrictService,
  ) {
    super();
  }

  get(query: FindOptionsWhere<DistrictWebsiteEntity>) {
    const queryBuilder = this.queryBuilder;

    queryBuilder.andWhere(query);

    return queryBuilder.getOne();
  }

  getAll(query: DistrictWebsiteListQueryDto) {
    const queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder.andWhere('districtWebsite.websiteId = :websiteId', { websiteId: query.websiteId });
    }

    return this.getManyAndCount(queryBuilder, query);
  }

  async create(body: DistrictWebsiteCreateBodyDto, user: IUser) {
    const district = await this.districtService.getByGHNId(body.id, true);

    const record = await this.districtWebsiteRepository.save({
      districtCode: district.code,
      websiteId: user.websiteId,
    });

    return this.get({
      districtCode: record.districtCode,
      websiteId: record.websiteId,
    });
  }

  async delete(code: string, websiteId: number) {
    await this.districtWebsiteRepository.delete({
      districtCode: code,
      websiteId,
    });
  }

  private get queryBuilder() {
    return this.districtWebsiteRepository
      .createQueryBuilder('districtWebsite')
      .leftJoinAndMapOne(
        'districtWebsite.district',
        DistrictEntity,
        'district',
        'district.code = districtWebsite.districtCode',
      )
      .leftJoinAndMapOne(
        'district.province',
        ProvinceEntity,
        'province',
        'district.provinceCode = province.code',
      )
      .leftJoinAndMapOne(
        'districtWebsite.website',
        WebsiteEntity,
        'website',
        'website.id = districtWebsite.websiteId',
      );
  }
}
