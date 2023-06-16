import { SearchResponse } from '@algolia/client-search';

export interface IAlgoliaBase {
  objectID: string;
  [key: string]: string | number | boolean | undefined | object;
}

export interface IAlgoliaCategory extends IAlgoliaBase {
  name: string;
}

export interface IAlgoliaContact extends IAlgoliaBase {
  name?: string;
  email?: string;
  phone?: string;
  zalo?: string;
}

export interface IAlgoliaEstate extends IAlgoliaBase {
  provinceName: string;
  districtName: string;
  wardName: string;
  address: string;
  title: string;
  customId: string;
  description: string;
  categoryName: string;
  contactName: string;
  propertyValues: string[];
  quarterName: string;
  price: number;
  area: number;
}

export type IAlgoliaSearchResult<T = unknown> = Readonly<Promise<SearchResponse<T>>>;

export type IAlgoliaSearchFunction = (query: string, retrieveAttributes?: string[]) => IAlgoliaSearchResult;
