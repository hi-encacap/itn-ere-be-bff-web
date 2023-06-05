import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudflareModule } from '../cloudflare/cloudflare.module';
import { AdminPostDraftController } from './controllers/admin-post-draft.controller';
import { AdminPostController } from './controllers/admin-post.controller';
import { PostDraftEntity } from './entities/post-draft.entity';
import { PostEntity } from './entities/post.entity';
import { PostDraftService } from './services/post-draft.service';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostDraftEntity]), CloudflareModule],
  controllers: [AdminPostController, AdminPostDraftController],
  providers: [PostService, PostDraftService],
})
export class PostModule {}
