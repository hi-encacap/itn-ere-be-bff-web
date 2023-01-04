import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { EstateImageEntity } from '../entities/estate-image.entity';

@Injectable()
export class EstateImageService {
  constructor(
    @InjectRepository(EstateImageEntity)
    private readonly estateImageRepository: Repository<EstateImageEntity>,
  ) {}

  save(estateImage: Partial<DeepPartial<EstateImageEntity>>) {
    return this.estateImageRepository.save(estateImage);
  }

  bulkSave(imageIds: string[], estateId: number) {
    const estateImagesToSave: DeepPartial<EstateImageEntity>[] = imageIds.map((imageId) => ({
      imageId,
      estateId,
    }));

    return this.estateImageRepository.save(estateImagesToSave);
  }
}
