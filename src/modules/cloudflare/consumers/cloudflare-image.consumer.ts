import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CloudflareImageService } from '../services/cloudflare-image.service';

@Processor('cloudflare-image')
export class CloudflareImageConsumer {
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
    console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    console.log(`Completed job ${job.id} of type ${job.name} with result ${result}`);
  }
}
