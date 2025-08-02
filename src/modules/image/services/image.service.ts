import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FormData from 'form-data';
import { get, set } from 'lodash';
import { randomStringPrefix } from 'src/common/utils/helpers.util';
import AppConfigService from 'src/configs/app/config.service';
import { CloudflareConfigService } from 'src/configs/cloudflare/cloudflare-config.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { IMAGE_ERROR_CODE } from '../constants/image-error-code.constant';
import { IMAGE_STATUS_ENUM } from '../constants/image-status.constant';
import { ImageEntity } from '../entities/image.entity';
import { ImageVariantService } from './image-variant.service';

@Injectable()
export class ImageService {
  private readonly logger = new Logger('CloudflareImageService');
  private readonly imageURL: string;

  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    private readonly httpService: HttpService,
    private readonly cloudflareConfigService: CloudflareConfigService,
    private readonly imageVariantService: ImageVariantService,
    private readonly appConfigService: AppConfigService,
  ) {
    this.imageURL = this.cloudflareConfigService.image.delivery;
  }

  async uploadSingle(file: Express.Multer.File, user: UserEntity) {
    try {
      const record = await this.imageRepository.save({
        id: randomStringPrefix(),
        status: IMAGE_STATUS_ENUM.PROCESSING,
        size: file.size,
        extension: file.mimetype,
        websiteId: user.websiteId,
      });
      return this.uploadToCloudflare(record.id, file.mimetype, file.buffer);
    } catch (error) {
      this.logger.error(error.toString());
      throw new UnprocessableEntityException(IMAGE_ERROR_CODE.IMAGE_FAILED_TO_PROCESS);
    }
  }

  uploadMultiple(files: Express.Multer.File[], user: UserEntity) {
    const task = [];

    for (const file of files) {
      task.push(this.uploadSingle(file, user));
    }

    return Promise.all(task);
  }

  async uploadToCloudflare(imageId: string, mimetype: string, buffer: Buffer) {
    const formData = new FormData();

    formData.append('file', Buffer.from(buffer), {
      filename: this.getFileName(imageId, mimetype),
      contentType: mimetype,
    });

    formData.append('id', imageId);

    try {
      await this.httpService.axiosRef.post('', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const record = await this.imageRepository.save({ id: imageId, status: IMAGE_STATUS_ENUM.READY });
      return this.mapVariantToImage(record, null);
    } catch (error) {
      this.logger.error(error);
      await this.imageRepository.save({ id: imageId, status: IMAGE_STATUS_ENUM.PROCESSING_ERROR });
      throw new UnprocessableEntityException(IMAGE_ERROR_CODE.IMAGE_FAILED_TO_PROCESS);
    }
  }

  get(imageId: string) {
    return this.imageRepository.findOne({ where: { id: imageId } });
  }

  getAll(query: FindManyOptions<ImageEntity>) {
    return this.imageRepository.find(query);
  }

  async mapVariantToImage<T>(object: T, imagePath: string | null) {
    if (Array.isArray(object)) {
      return Promise.all(object.map((item) => this.mapVariantToImage(item, imagePath)));
    }

    const image = imagePath ? get(object, imagePath) : object;

    if (!image || typeof object !== 'object') {
      return object;
    }

    const transformedImage = await this.transformImageToURL(image);

    if (imagePath === null) {
      return transformedImage;
    }

    return set(object, imagePath, await this.transformImageToURL(image));
  }

  async mapVariantToImages<T>(object: T, imagePath: string) {
    if (Array.isArray(object)) {
      return Promise.all(object.map((item) => this.mapVariantToImages(item, imagePath)));
    }

    const images = get(object, imagePath);

    if (!images || typeof object !== 'object') {
      return object;
    }

    return set(object, imagePath, await Promise.all(images.map((image) => this.transformImageToURL(image))));
  }

  private async transformImageToURL(image: ImageEntity) {
    const { id } = image;

    const imageVariants = await this.imageVariantService.getAllCached();

    if (!imageVariants?.length) {
      return null;
    }

    const newVariants = imageVariants.reduce((acc, variant) => {
      return { ...acc, [variant.code]: `${this.imageURL}/${id}/${variant.code}` };
    }, {});

    return { ...image, ...newVariants };
  }

  private getFileName(id: string, mimetype: string) {
    return `${this.appConfigService.name}_${id}.${mimetype.split('/')[1]}`;
  }
}
