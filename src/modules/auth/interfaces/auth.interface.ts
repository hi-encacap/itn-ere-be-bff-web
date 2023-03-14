import { IRole, IWebsite } from 'encacap/dist/re';

export interface IJwtPayload {
  id: number;
  email: string;
  roles: IRole[];
  website: IWebsite;
}
