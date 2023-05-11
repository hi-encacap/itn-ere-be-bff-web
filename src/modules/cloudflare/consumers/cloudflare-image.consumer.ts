import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CloudflareImageService } from '../services/cloudflare-image.service';

@Processor('cloudflare-image')
export class CloudflareImageConsumer {
  private readonly logger = new Logger(CloudflareImageConsumer.name);
  constructor(private readonly cloudflareImageService: CloudflareImageService) {}

  @Process('upload')
  upload(job: Job) {
    return this.cloudflareImageService.uploadToCloudflare(
      job.data.imageId,
      job.data.file.mimetype,
      Buffer.from(job.data.file.buffer),
    );
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing image ${job.data.imageId}...`);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: unknown) {
    const resultMessage = typeof result === 'string' ? result : JSON.stringify(result);

    this.logger.debug(`Processed image ${job.data.imageId} successfully with result: ${resultMessage}`);
  }
}
