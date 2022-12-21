import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinceWebsiteEntity } from '../entities/province-website.entity';

@Injectable()
export class ProvinceWebsiteService {
  constructor(
    @InjectRepository(ProvinceWebsiteEntity)
    private readonly provinceWebsiteRepository: Repository<ProvinceWebsiteEntity>,
  ) {}

  create(provinceCode: string, websiteId: number) {
    const record = this.provinceWebsiteRepository.create({
      provinceCode,
      websiteId,
    });

    return this.provinceWebsiteRepository.save(record);
  }
}
