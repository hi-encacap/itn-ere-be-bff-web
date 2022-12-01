import { Module } from '@nestjs/common';
import { AlgoliaConfigModule } from 'src/configs/algolia/algolia-config.module';
import { AppConfigModule } from 'src/configs/config.module';
import { AlgoliaService } from './algolia.service';

@Module({
  imports: [AlgoliaConfigModule, AppConfigModule],
  controllers: [],
  providers: [AlgoliaService],
  exports: [AlgoliaService],
})
export class AlgoliaProviderModule {}
