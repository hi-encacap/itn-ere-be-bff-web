import { BadRequestException, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new UnprocessableEntityException({
        file: ['File is required.'],
      });
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException({
        file: ['Your file must be a PNG, JPEG, GIF, or WebP.'],
      });
    }

    return file;
  }
}
