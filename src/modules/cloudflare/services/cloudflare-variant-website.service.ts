import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RootCreateCloudflareVariantWebsiteDto } from '../dto/root-create-cloudflare-variant-website.dto';
import { CloudflareVariantWebsiteEntity } from '../entities/cloudflare-variant-website.entity';

@Injectable()
export class CloudflareVariantWebsiteService {
  constructor(
    @InjectRepository(CloudflareVariantWebsiteEntity)
    private readonly cloudflareVariantWebsiteRepository: Repository<CloudflareVariantWebsiteEntity>,
  ) {}

  createWebsiteVariant(variant: RootCreateCloudflareVariantWebsiteDto) {
    return this.cloudflareVariantWebsiteRepository.save(variant);
  }

  getAll(query: FindOptionsWhere<CloudflareVariantWebsiteEntity>) {
    const queryBuilder = this.cloudflareVariantWebsiteRepository
      .createQueryBuilder('variantWebsite')
      .where(query)
      .leftJoinAndSelect('variantWebsite.website', 'website')
      .leftJoinAndSelect('variantWebsite.variant', 'variant');

    if (query.websiteId) {
      queryBuilder.andWhere('website.id = :websiteId', { websiteId: query.websiteId });
    }

    return queryBuilder.getMany();
  }
}
