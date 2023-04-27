import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CloudflareImageValidationPipe } from '../pipes/cloudflare-image-validation.pipe';
import { CloudflareImagesValidationPipe } from '../pipes/cloudflare-images-validation.pipe';
import { CloudflareImageService } from '../services/cloudflare-image.service';

@Controller('admin/cloudflare/images')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class AdminCloudflareImageController {
  constructor(private readonly cloudflareImageService: CloudflareImageService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(CloudflareImageValidationPipe)
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() { user }) {
    return this.cloudflareImageService.uploadSingle(file, user);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  @UsePipes(CloudflareImagesValidationPipe)
  uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[], @Req() { user }) {
    return this.cloudflareImageService.uploadMultiple(files, user);
  }
}
