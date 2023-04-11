import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit, pick } from 'lodash';
import { MemCachingService } from 'src/providers/mem-caching/mem-caching.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RootCloudflareVariantCreateBodyDto } from '../dtos/root-cloudflare-variant-create-body.dto';
import { RootCloudflareVariantUpdateBodyDto } from '../dtos/root-cloudflare-variant-update-body.dto';
import { CloudflareVariantEntity } from '../entities/cloudflare-variant.entity';

@Injectable()
export class CloudflareVariantService {
  constructor(
    @InjectRepository(CloudflareVariantEntity)
    private readonly cloudflareVariantRepository: Repository<CloudflareVariantEntity>,
    private readonly httpService: HttpService,
    private readonly memCachingService: MemCachingService,
  ) {}

  async getAllCached() {
    const cachedData = await this.memCachingService.getCloudflareVariants();

    if (cachedData !== null) {
      return cachedData;
    }

    const data = await this.getAll();

    await this.memCachingService.setCloudflareVariants(data);

    return data;
  }

  async updateCache() {
    const data = await this.getAll();

    await this.memCachingService.setCloudflareVariants(data);

    return data;
  }

  async getAll(query?: FindOptionsWhere<CloudflareVariantEntity>) {
    const queryBuilder = this.getQueryBuilder().where(omit(query, ['websiteId']));

    if (query?.websiteId) {
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

      await this.cloudflareVariantRepository.save({
        ...variant,
        id: variant.name,
      });

      return this.updateCache();
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

      await this.cloudflareVariantRepository.update(code, updateBody);

      return this.updateCache();
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  async deleteVariant(id: string) {
    try {
      await this.httpService.axiosRef.delete(`variants/${id}`);

      await this.cloudflareVariantRepository.delete(id);

      return this.updateCache();
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  private getQueryBuilder() {
    return this.cloudflareVariantRepository.createQueryBuilder('variant');
  }
}
