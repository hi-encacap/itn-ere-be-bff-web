import { Injectable } from '@nestjs/common';

@Injectable()
export class DistrictService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByCode(code: string) {
    return {
      code: 'quan-thu-duc',
      ghnRefId: 3695,
    };
  }
}
