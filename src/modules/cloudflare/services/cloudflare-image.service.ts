import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import FormData from 'form-data';
import { LoggerService } from 'src/common/modules/logger/logger.service';
import { randomStringPrefix } from 'src/common/utils/helpers.util';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CloudflareImageStatusEnum } from '../constants/cloudflare-image-status.constant';
import { CloudflareImageEntity } from '../entities/cloudflare-image.entity';

@Injectable()
export class CloudflareImageService {
  private logger = new LoggerService('CloudflareImageService');

  constructor(
    @InjectRepository(CloudflareImageEntity)
    private readonly cloudflareImageRepository: Repository<CloudflareImageEntity>,
    private readonly httpService: HttpService,
    @InjectQueue('cloudflare-image')
    private readonly cloudflareImageQueue: Queue,
  ) {}

  async uploadSingle(file: Express.Multer.File, user: UserEntity) {
    const imageId = randomStringPrefix();

    const record = await this.cloudflareImageRepository.save({
      id: imageId,
      status: CloudflareImageStatusEnum.PROCESSING,
      size: file.size,
      extension: file.mimetype,
      userId: user.id,
    });

    await this.cloudflareImageQueue.add('upload', {
      imageId,
      file,
    });

    return record;
  }

  async uploadMultiple(files: Express.Multer.File[], user: UserEntity) {
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
      await this.cloudflareImageRepository.save({
        id: imageId,
        status: CloudflareImageStatusEnum.READY,
      });
    } catch (error) {
      this.logger.error(error);
      await this.cloudflareImageRepository.save({
        id: imageId,
        status: CloudflareImageStatusEnum.PROCESSING_ERROR,
      });
    }
  }

  private getFileName(id: string, mimetype: string) {
    return `ENCACAP_RE_${id}.${mimetype.split('/')[1]}`;
  }
}
