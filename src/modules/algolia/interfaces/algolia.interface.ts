import { SearchResponse } from '@algolia/client-search';

export interface IAlgoliaBase {
  objectID: string;
  [key: string]: string | number | boolean | undefined;
}

export interface IAlgoliaCategory extends IAlgoliaBase {
  name: string;
  categoryGroupName: string;
}

export interface IAlgoliaContact extends IAlgoliaBase {
  name?: string;
  email?: string;
  phone?: string;
  zalo?: string;
}

export type IAlgoliaSearchResult<T = unknown> = Readonly<Promise<SearchResponse<T>>>;

export type IAlgoliaSearchFunction = (query: string, retrieveAttributes?: string[]) => IAlgoliaSearchResult;
