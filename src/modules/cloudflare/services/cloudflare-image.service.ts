import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FormData from 'form-data';
import { randomStringPrefix } from 'src/common/utils/helpers.util';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CloudflareImageStatusEnum } from '../constants/cloudflare-image-status.constant';
import { CloudflareImageEntity } from '../entities/cloudflare-image.entity';

@Injectable()
export class CloudflareImageService {
  constructor(
    @InjectRepository(CloudflareImageEntity)
    private readonly cloudflareImageEntity: Repository<CloudflareImageEntity>,
    private readonly httpService: HttpService,
  ) {}

  async upload(file: Express.Multer.File, user: UserEntity) {
    const imageId = randomStringPrefix();

    const formData = new FormData();

    formData.append('file', file.buffer, {
      filename: this.getFileName(imageId, file.mimetype),
      contentType: file.mimetype,
    });
    formData.append('id', imageId);

    try {
      await this.httpService.axiosRef.post('', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }

    const record = await this.cloudflareImageEntity.save({
      id: imageId,
      status: CloudflareImageStatusEnum.PROCESSING,
      size: file.size,
      extension: file.mimetype,
      userId: user.id,
    });

    return record;
  }

  async uploadMultiple(files: Express.Multer.File[], user: UserEntity) {
    const records = [];

    for (const file of files) {
      const record = await this.upload(file, user);
      records.push(record);
    }

    return records;
  }

  private getFileName(id: string, mimetype: string) {
    return `ENCACAP_RE_${id}.${mimetype.split('/')[1]}`;
  }
}
