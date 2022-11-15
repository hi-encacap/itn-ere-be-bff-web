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
    return this.cloudflareVariantWebsiteRepository
      .createQueryBuilder('variant_website')
      .where(query)
      .leftJoinAndSelect('variant_website.website', 'website')
      .leftJoinAndSelect('variant_website.variant', 'variant')
      .getMany();
  }
}
