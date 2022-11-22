import { IWebsite } from 'src/modules/website/constants/website.interface';

export interface IRole {
  id: number;
  name: string;
  slug: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  websiteId?: number;
  website: IWebsite;
  roles: IRole[];
}
