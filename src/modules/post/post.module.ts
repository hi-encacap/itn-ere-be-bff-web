import { ShopifyModule } from '@modules/shopify/shopify.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { CloudflareModule } from '../image/cloudflare.module';
import { AdminPostDraftController } from './controllers/admin-post-draft.controller';
import { AdminPostController } from './controllers/admin-post.controller';
import { PublicPostController } from './controllers/public-post.controller';
import { PostDraftEntity } from './entities/post-draft.entity';
import { PostImageEntity } from './entities/post-image.entity';
import { PostEntity } from './entities/post.entity';
import { PostDraftService } from './services/post-draft.service';
import { PostImageService } from './services/post-image.service';
import { PostService } from './services/post.service';
import { PostExistsValidator } from './validators/post-exists.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostDraftEntity, PostImageEntity]),
    CloudflareModule,
    CategoryModule,
    forwardRef(() => ShopifyModule),
  ],
  controllers: [AdminPostController, AdminPostDraftController, PublicPostController],
  providers: [PostService, PostDraftService, PostImageService, PostExistsValidator],
  exports: [PostService, PostDraftService],
})
export class PostModule {}
