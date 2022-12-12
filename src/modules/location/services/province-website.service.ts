import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Repository } from 'typeorm';
import { ProvinceCreateBodyDto } from '../dto/province-create-body.dto';
import { ProvinceWebsiteListQueryDto } from '../dto/province-website-list-query.dto';
import { ProvinceWebsiteEntity } from '../entities/province-website.entity';
import { ProvinceEntity } from '../entities/province.entity';
import { ProvinceService } from './province.service';

@Injectable()
export class ProvinceWebsiteService extends BaseService {
  constructor(
    @InjectRepository(ProvinceWebsiteEntity)
    private readonly provinceWebsiteRepository: Repository<ProvinceWebsiteEntity>,

    private readonly provinceService: ProvinceService,
  ) {
    super();
  }

  get(query: ProvinceWebsiteListQueryDto) {
    const queryBuilder = this.queryBuilder;

    queryBuilder.andWhere(query);

    return queryBuilder.getOne();
  }

  getAll(query: ProvinceWebsiteListQueryDto) {
    const queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder.andWhere('provinceWebsite.websiteId = :websiteId', { websiteId: query.websiteId });
    }

    return this.getManyAndCount(queryBuilder, query);
  }

  async create(body: ProvinceCreateBodyDto, user: IUser) {
    const province = await this.provinceService.getByGHNId(body.id, true);

    const record = await this.provinceWebsiteRepository.save({
      provinceCode: province.code,
      websiteId: user.websiteId,
    });

    return this.get({
      provinceCode: record.provinceCode,
      websiteId: record.websiteId,
    });
  }

  async delete(code: string, websiteId: number) {
    await this.provinceWebsiteRepository.delete({
      provinceCode: code,
      websiteId,
    });
  }

  private get queryBuilder() {
    return this.provinceWebsiteRepository
      .createQueryBuilder('provinceWebsite')
      .leftJoinAndMapOne(
        'provinceWebsite.province',
        ProvinceEntity,
        'province',
        'province.code = provinceWebsite.provinceCode',
      )
      .leftJoinAndMapOne(
        'provinceWebsite.website',
        WebsiteEntity,
        'website',
        'website.id = provinceWebsite.websiteId',
      );
  }
}
