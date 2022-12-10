import { Module } from '@nestjs/common';
import { AlgoliaConfigModule } from 'src/configs/algolia/algolia-config.module';
import { AppConfigModule } from 'src/configs/config.module';
import { AlgoliaCategoryService } from './services/algolia-category.service';
import { AlgoliaContactService } from './services/algolia-contact.service';

@Module({
  imports: [AlgoliaConfigModule, AppConfigModule],
  controllers: [],
  providers: [AlgoliaCategoryService, AlgoliaContactService],
  exports: [AlgoliaCategoryService, AlgoliaContactService],
})
export class AlgoliaModule {}
