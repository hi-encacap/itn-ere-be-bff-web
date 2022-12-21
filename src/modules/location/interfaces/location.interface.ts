export interface IBaseLocation {
  code: string;
  name: string;
  ghnRefId: number;
}

export interface IProvince extends IBaseLocation {
  countryId: number;
}

export interface IDistrict extends IBaseLocation {
  provinceCode: string;
  province: IProvince;
}

export interface IWard extends IBaseLocation {
  districtCode: string;
  district: IDistrict;
}
