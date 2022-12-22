import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DistrictWebsiteEntity } from '../entities/district-website.entity';

@Injectable()
export class DistrictWebsiteService {
  constructor(
    @InjectRepository(DistrictWebsiteEntity)
    private readonly districtWebsiteRepository: Repository<DistrictWebsiteEntity>,
  ) {}

  get(query: FindOptionsWhere<DistrictWebsiteEntity>) {
    return this.districtWebsiteRepository.findOneBy(query);
  }

  create(districtCode: string, websiteId: number) {
    const record = this.districtWebsiteRepository.create({
      districtCode,
      websiteId,
    });

    return this.districtWebsiteRepository.save(record);
  }

  delete(districtCode: string, websiteId: number) {
    return this.districtWebsiteRepository.delete({ districtCode, websiteId });
  }
}
