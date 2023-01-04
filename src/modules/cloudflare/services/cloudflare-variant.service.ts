import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit, pick } from 'lodash';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RootCloudflareVariantCreateBodyDto } from '../dto/root-cloudflare-variant-create-body.dto';
import { RootCloudflareVariantUpdateBodyDto } from '../dto/root-cloudflare-variant-update-body.dto';
import { CloudflareVariantWebsiteEntity } from '../entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from '../entities/cloudflare-variant.entity';

@Injectable()
export class CloudflareVariantService {
  constructor(
    @InjectRepository(CloudflareVariantEntity)
    private readonly cloudflareVariantRepository: Repository<CloudflareVariantEntity>,
    private readonly httpService: HttpService,
  ) {}

  getAll(query: FindOptionsWhere<CloudflareVariantEntity>) {
    const queryBuilder = this.getQueryBuilder().where(omit(query, ['websiteId']));

    if (query.websiteId) {
      queryBuilder.andWhere('website.id = :websiteId', { websiteId: query.websiteId });
    }

    return queryBuilder.getMany();
  }

  getOne(query: FindOptionsWhere<CloudflareVariantEntity>) {
    return this.getQueryBuilder().where(query).getOne();
  }

  async createVariant(variant: RootCloudflareVariantCreateBodyDto) {
    try {
      await this.httpService.axiosRef.post('variants', {
        id: variant.name,
        options: pick(variant, ['fit', 'width', 'height']),
      });

      return this.cloudflareVariantRepository.save({
        ...variant,
        id: variant.name,
      });
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  async updateVariant(code: string, variant: RootCloudflareVariantUpdateBodyDto) {
    const record = await this.getOne({ code });

    if (!record) {
      throw new NotFoundException(`Variant with code ${code} not found.`);
    }

    const updateBody = pick(variant, ['fit', 'width', 'height']);

    try {
      await this.httpService.axiosRef.patch(`variants/${code}`, {
        id: code,
        options: updateBody,
      });

      return this.cloudflareVariantRepository.update(code, updateBody);
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  async deleteVariant(id: string) {
    try {
      await this.httpService.axiosRef.delete(`variants/${id}`);

      return this.cloudflareVariantRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  private getQueryBuilder() {
    return this.cloudflareVariantRepository
      .createQueryBuilder('variant')
      .leftJoin(CloudflareVariantWebsiteEntity, 'variantWebsite', 'variantWebsite.variantCode = variant.code')
      .leftJoinAndMapMany(
        'variant.websites',
        WebsiteEntity,
        'website',
        'website.id = variantWebsite.websiteId',
      );
  }
}
