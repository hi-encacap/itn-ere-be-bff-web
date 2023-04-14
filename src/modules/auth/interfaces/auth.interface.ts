import { IRole } from '@encacap-group/types/dist/account';
import { IWebsite } from '@encacap-group/types/dist/re';

export interface IJwtPayload {
  id: number;
  email: string;
  roles: IRole[];
  website: IWebsite;
}
