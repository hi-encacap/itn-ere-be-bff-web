import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit, pick } from 'lodash';
import { MemCachingService } from 'src/providers/mem-caching/mem-caching.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RootImageVariantCreateBodyDto } from '../dtos/root-image-variant-create-body.dto';
import { RootImageVariantUpdateBodyDto } from '../dtos/root-image-variant-update-body.dto';
import { ImageVariantEntity } from '../entities/image-variant.entity';

@Injectable()
export class ImageVariantService {
  constructor(
    @InjectRepository(ImageVariantEntity)
    private readonly imageVariantRepository: Repository<ImageVariantEntity>,
    private readonly httpService: HttpService,
    private readonly memCachingService: MemCachingService,
  ) {}

  async getAllCached() {
    const cachedData = await this.memCachingService.getCloudflareVariants();

    if (cachedData) {
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

  getAll(query?: FindOptionsWhere<ImageVariantEntity>) {
    const queryBuilder = this.getQueryBuilder().where(omit(query, ['websiteId']));

    return queryBuilder.getMany();
  }

  getOne(query: FindOptionsWhere<ImageVariantEntity>) {
    return this.getQueryBuilder().where(query).getOne();
  }

  async createVariant(variant: RootImageVariantCreateBodyDto) {
    try {
      await this.httpService.axiosRef.post('variants', {
        id: variant.name,
        options: pick(variant, ['fit', 'width', 'height']),
      });
      await this.imageVariantRepository.save({
        ...variant,
        id: variant.name,
      });
      await this.updateCache();
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  async updateVariant(code: string, variant: RootImageVariantUpdateBodyDto) {
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
      await this.imageVariantRepository.update(code, updateBody);
      await this.updateCache();
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  async deleteVariant(id: string) {
    try {
      await this.httpService.axiosRef.delete(`variants/${id}`);
      await this.updateCache();
      await this.imageVariantRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  private getQueryBuilder() {
    return this.imageVariantRepository.createQueryBuilder('variant');
  }
}
