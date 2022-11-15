import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RootCreateCloudflareVariantDto } from '../dto/root-create-cloudflare-variant.dto';
import { CloudflareVariantWebsiteEntity } from '../entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from '../entities/cloudflare-variant.entity';

@Injectable()
export class CloudflareVariantService {
  constructor(
    @InjectRepository(CloudflareVariantEntity)
    private readonly cloudflareVariantRepository: Repository<CloudflareVariantEntity>,
  ) {}

  createVariant(variant: RootCreateCloudflareVariantDto) {
    return this.cloudflareVariantRepository.create(variant);
  }

  getAll(query: FindOptionsWhere<CloudflareVariantEntity>) {
    return this.getQueryBuilder().where(query).getMany();
  }

  getOne(query: FindOptionsWhere<CloudflareVariantEntity>) {
    return this.getQueryBuilder().where(query).getOne();
  }

  private getQueryBuilder() {
    return this.cloudflareVariantRepository
      .createQueryBuilder('variant')
      .leftJoin(CloudflareVariantWebsiteEntity, 'variant_website', 'variant_website.variant_id = variant.id')
      .leftJoinAndMapMany(
        'variant.websites',
        WebsiteEntity,
        'website',
        'website.id = variant_website.website_id',
      );
  }
}
