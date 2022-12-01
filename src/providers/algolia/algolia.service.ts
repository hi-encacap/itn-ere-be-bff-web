import { Injectable } from '@nestjs/common';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
import { AlgoliaConfigService } from 'src/configs/algolia/algolia-config.service';
import AppConfigService from 'src/configs/config.service';
import { IAlgoliaCategory } from './interfaces/algolia.interface';

@Injectable()
export class AlgoliaService {
  private readonly client: SearchClient;
  private categoryIndex: SearchIndex;

  constructor(
    private readonly algoliaConfigService: AlgoliaConfigService,
    private readonly appConfigService: AppConfigService,
  ) {
    this.client = algoliasearch(this.algoliaConfigService.appID, this.algoliaConfigService.apiKey);
    this.categoryIndex = this.client.initIndex(`${this.appConfigService.envAlias}_category`);
  }

  addCategory(category: IAlgoliaCategory) {
    this.categoryIndex.saveObject(category);
  }

  updateCategory(category: IAlgoliaCategory) {
    this.categoryIndex.partialUpdateObject(category);
  }

  removeCategory(categoryCode: string) {
    this.categoryIndex.deleteObject(categoryCode);
  }

  searchCategories(query: string, retrieveAttributes?: string[]) {
    return this.categoryIndex.search(query, {
      attributesToRetrieve: retrieveAttributes ?? ['code', 'name', 'categoryGroupCode'],
    });
  }
}
