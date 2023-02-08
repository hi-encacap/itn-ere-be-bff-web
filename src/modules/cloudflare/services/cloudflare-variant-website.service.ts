import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RootCloudflareVariantWebsiteCreateBodyDto } from '../dtos/root-cloudflare-variant-website-create-body.dto';
import { CloudflareVariantWebsiteEntity } from '../entities/cloudflare-variant-website.entity';

@Injectable()
export class CloudflareVariantWebsiteService {
  constructor(
    @InjectRepository(CloudflareVariantWebsiteEntity)
    private readonly cloudflareVariantWebsiteRepository: Repository<CloudflareVariantWebsiteEntity>,
  ) {}

  createWebsiteVariant(variant: RootCloudflareVariantWebsiteCreateBodyDto) {
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
