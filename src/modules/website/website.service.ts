import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WebsiteEntity } from './entities/website.entity';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(WebsiteEntity) private readonly websiteRepository: Repository<WebsiteEntity>,
  ) {}

  get(query: FindOptionsWhere<WebsiteEntity>) {
    return this.websiteRepository.findOneBy(query);
  }

  async getOrFail(query: FindOptionsWhere<WebsiteEntity>) {
    const record = await this.websiteRepository.findOneByOrFail(query);

    if (!record) {
      throw new NotFoundException();
    }

    return record;
  }

  getAll() {
    return this.websiteRepository.find();
  }

  async updateById(id: number, body: Partial<WebsiteEntity>) {
    const record = await this.getOrFail({ id });

    return this.websiteRepository.save({
      ...record,
      ...body,
    });
  }
}
