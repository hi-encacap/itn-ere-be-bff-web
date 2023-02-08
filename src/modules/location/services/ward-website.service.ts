import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WardWebsiteEntity } from '../entities/ward-website.entity';

@Injectable()
export class WardWebsiteService {
  constructor(
    @InjectRepository(WardWebsiteEntity)
    private readonly wardWebsiteRepository: Repository<WardWebsiteEntity>,
  ) {}

  get(query: FindOptionsWhere<WardWebsiteEntity>) {
    return this.wardWebsiteRepository.findOneBy(query);
  }

  getAll(query: FindOptionsWhere<WardWebsiteEntity>) {
    return this.wardWebsiteRepository.findBy(query);
  }

  create(wardCode: string, websiteId: number) {
    const record = this.wardWebsiteRepository.create({
      wardCode,
      websiteId,
    });

    return this.wardWebsiteRepository.save(record);
  }

  delete(wardCode: string, websiteId: number) {
    return this.wardWebsiteRepository.delete({ wardCode, websiteId });
  }
}
