import { IRole } from '@encacap-group/common/dist/account';
import { IWebsite } from '@encacap-group/common/dist/re';

export interface IJwtPayload {
  id: number;
  email: string;
  roles: IRole[];
  website: IWebsite;
}
