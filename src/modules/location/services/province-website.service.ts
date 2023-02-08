import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ProvinceWebsiteEntity } from '../entities/province-website.entity';

@Injectable()
export class ProvinceWebsiteService {
  constructor(
    @InjectRepository(ProvinceWebsiteEntity)
    private readonly provinceWebsiteRepository: Repository<ProvinceWebsiteEntity>,
  ) {}

  get(query: FindOptionsWhere<ProvinceWebsiteEntity>) {
    return this.provinceWebsiteRepository.findOneBy(query);
  }

  getAll(query: FindOptionsWhere<ProvinceWebsiteEntity>) {
    return this.provinceWebsiteRepository.findBy(query);
  }

  create(provinceCode: string, websiteId: number) {
    const record = this.provinceWebsiteRepository.create({
      provinceCode,
      websiteId,
    });

    return this.provinceWebsiteRepository.save(record);
  }

  delete(provinceCode: string, websiteId: number) {
    return this.provinceWebsiteRepository.delete({ provinceCode, websiteId });
  }
}
