import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CloudflareImageValidationPipe } from '../pipes/cloudflare-image-validation.pipe';
import { CloudflareImageService } from '../services/cloudflare-image.service';

@Controller('admin/cloudflare/images')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminCloudflareImageController {
  constructor(private readonly cloudflareImageService: CloudflareImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(CloudflareImageValidationPipe)
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Req() { user }) {
    return this.cloudflareImageService.uploadImage(file, user);
  }
}
