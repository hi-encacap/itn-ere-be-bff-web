export interface IGHNProvince {
  ProvinceID: number;
  ProvinceName: string;
}

export interface IGHNDistrict {
  DistrictID: number;
  DistrictName: string;
  ProvinceID: number;
}

export interface IGHNWard {
  WardCode: string;
  WardName: string;
  DistrictID: number;
}
