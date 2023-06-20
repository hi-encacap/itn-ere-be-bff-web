import { BadRequestException, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class ImagesValidationPipe implements PipeTransform {
  transform(files: Express.Multer.File[]) {
    if (!files) {
      throw new UnprocessableEntityException({
        files: ['Files are required.'],
      });
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException({
          files: ['Your files must be PNG, JPEG, GIF, or WebP.'],
        });
      }
    }

    return files;
  }
}
