import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { LoggerService } from 'src/common/modules/logger/logger.service';
import { CloudflareImageService } from '../services/cloudflare-image.service';

@Processor('cloudflare-image')
export class CloudflareImageConsumer {
  private readonly logger = new LoggerService('CloudflareImageConsumer');
  constructor(private readonly cloudflareImageService: CloudflareImageService) {}

  @Process('upload')
  async upload(job: Job) {
    this.cloudflareImageService.uploadToCloudflare(
      job.data.imageId,
      job.data.file.mimetype,
      Buffer.from(job.data.file.buffer),
    );
    return true;
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing image ${job.data.imageId}...`);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: unknown) {
    this.logger.debug(`Processed image ${job.data.imageId} successfully with result: ${result}`);
  }
}
