import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PostImageEntity } from '../entities/post-image.entity';

@Injectable()
export class PostImageService {
  constructor(
    @InjectRepository(PostImageEntity)
    private readonly postImageRepository: Repository<PostImageEntity>,
  ) {}

  save(image: Partial<DeepPartial<PostImageEntity>>) {
    return this.postImageRepository.save(image);
  }

  async bulkSave(imageIds: string[], postId: number) {
    await this.bulkDelete(postId);

    const estateImagesToSave: DeepPartial<PostImageEntity>[] = imageIds.map((imageId) => ({
      imageId,
      postId,
    }));

    return this.postImageRepository.save(estateImagesToSave);
  }

  bulkDelete(postId: number) {
    return this.postImageRepository.delete({ postId });
  }
}
