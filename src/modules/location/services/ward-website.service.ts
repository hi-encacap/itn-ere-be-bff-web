import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WardWebsiteCreateBodyDto } from '../dto/ward-website-create-body.dto';
import { WardWebsiteListQueryDto } from '../dto/ward-website-list-query.dto';
import { DistrictEntity } from '../entities/district.entity';
import { ProvinceEntity } from '../entities/province.entity';
import { WardWebsiteEntity } from '../entities/ward-website.entity';
import { WardEntity } from '../entities/ward.entity';
import { WardService } from './ward.service';

@Injectable()
export class WardWebsiteService extends BaseService {
  constructor(
    @InjectRepository(WardWebsiteEntity)
    private readonly wardWebsiteRepository: Repository<WardWebsiteEntity>,

    private readonly wardService: WardService,
  ) {
    super();
  }

  get(query: FindOptionsWhere<WardWebsiteEntity>) {
    const queryBuilder = this.queryBuilder;

    queryBuilder.andWhere(query);

    return queryBuilder.getOne();
  }

  getAll(query: WardWebsiteListQueryDto) {
    const queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder.andWhere('wardWebsite.websiteId = :websiteId', { websiteId: query.websiteId });
    }

    return this.getManyAndCount(queryBuilder, query);
  }

  async create(body: WardWebsiteCreateBodyDto, user: IUser) {
    const ward = await this.wardService.getByGHNId(body.id, body.districtGhnRefId, true);

    const record = await this.wardWebsiteRepository.save({
      wardCode: ward.code,
      websiteId: user.websiteId,
    });

    return this.get({
      wardCode: record.wardCode,
      websiteId: record.websiteId,
    });
  }

  async delete(code: string, websiteId: number) {
    await this.wardWebsiteRepository.delete({
      wardCode: code,
      websiteId,
    });
  }

  private get queryBuilder() {
    return this.wardWebsiteRepository
      .createQueryBuilder('wardWebsite')
      .leftJoinAndMapOne('wardWebsite.ward', WardEntity, 'ward', 'ward.code = wardWebsite.wardCode')
      .leftJoinAndMapOne('ward.district', DistrictEntity, 'district', 'ward.districtCode = district.code')
      .leftJoinAndMapOne(
        'district.province',
        ProvinceEntity,
        'province',
        'district.provinceCode = province.code',
      )
      .leftJoinAndMapOne(
        'wardWebsite.website',
        WebsiteEntity,
        'website',
        'website.id = wardWebsite.websiteId',
      );
  }
}
