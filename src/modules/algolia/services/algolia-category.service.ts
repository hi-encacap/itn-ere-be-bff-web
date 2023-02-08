import { Injectable } from '@nestjs/common';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
import { AlgoliaConfigService } from 'src/configs/algolia/algolia-config.service';
import AppConfigService from 'src/configs/config.service';
import { IAlgoliaCategory } from '../interfaces/algolia.interface';

@Injectable()
export class AlgoliaCategoryService {
  private readonly client: SearchClient;
  private index: SearchIndex;

  constructor(
    private readonly algoliaConfigService: AlgoliaConfigService,
    private readonly appConfigService: AppConfigService,
  ) {
    this.client = algoliasearch(this.algoliaConfigService.appID, this.algoliaConfigService.apiKey);
    this.index = this.client.initIndex(`${this.appConfigService.envAlias}_category`);
  }

  save(item: IAlgoliaCategory) {
    this.index.saveObject(item);
  }

  update(item: IAlgoliaCategory) {
    this.index.partialUpdateObject(item);
  }

  remove(objectID: string) {
    this.index.deleteObject(objectID);
  }

  search(query: string, retrieveAttributes?: string[]) {
    return this.index.search(query, {
      attributesToRetrieve: retrieveAttributes ?? ['code', 'name', 'categoryGroupCode'],
    });
  }
}
