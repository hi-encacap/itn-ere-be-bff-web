import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, UnprocessableEntityException, forwardRef } from '@nestjs/common';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { IDistrict, IProvince, IWard } from '../interfaces/location.interface';
import { DistrictService } from './district.service';
import { ProvinceService } from './province.service';
import { WardService } from './ward.service';

@Injectable()
export class GHNService {
  constructor(
    @Inject(forwardRef(() => ProvinceService)) private readonly provinceService: ProvinceService,
    @Inject(forwardRef(() => DistrictService)) private readonly districtService: DistrictService,
    @Inject(forwardRef(() => WardService)) private readonly wardService: WardService,

    private readonly httpService: HttpService,
  ) {}

  async getProvinces(websiteId?: number): Promise<IProvince[]> {
    try {
      const { items: existedProvinces } = await this.provinceService.getAll({
        websiteId,
      });
      const existedProvinceGhnRefIds = existedProvinces.map((province) => province.ghnRefId);

      const response = await this.httpService.axiosRef.get('master-data/province');
      return this.format<IProvince>(
        response.data.data,
        ['ProvinceID', 'ProvinceName', 'CountryID'],
        ['ghnRefId', 'name', 'countryId'],
      ).filter((province) => !existedProvinceGhnRefIds.includes(province.ghnRefId));
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async getProvince(refId: number) {
    const provinces = await this.getProvinces();

    const province = provinces.find((province) => province.ghnRefId === refId);

    if (!province) {
      throw new UnprocessableEntityException(LOCATION_ERROR_CODE.PROVINCE_NOT_EXISTS);
    }

    return province;
  }

  async getDistricts(provinceCode: string, websiteId?: number): Promise<IDistrict[]> {
    try {
      const province = await this.provinceService.get({ code: provinceCode });
      const existedDistricts = await this.districtService.getAll({
        provinceCode,
        websiteId,
      });
      const existedDistrictGhnRefIds = existedDistricts.items.map((district) => district.ghnRefId);

      const response = await this.httpService.axiosRef.get('master-data/district', {
        params: {
          province_id: province.ghnRefId,
        },
      });

      return this.format<IDistrict>(
        response.data.data,
        ['DistrictID', 'DistrictName', 'ProvinceID'],
        ['ghnRefId', 'name', 'provinceGhnRefId'],
        { provinceCode },
      ).filter((district) => !existedDistrictGhnRefIds.includes(district.ghnRefId));
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async getDistrict(provinceCode: string, refId: number) {
    const districts = await this.getDistricts(provinceCode);

    const district = districts.find((district) => district.ghnRefId === refId);

    if (!district) {
      throw new UnprocessableEntityException(LOCATION_ERROR_CODE.DISTRICT_NOT_EXISTS);
    }

    return district;
  }

  async getWards(districtCode: string, websiteId?: number): Promise<IWard[]> {
    try {
      const district = await this.districtService.get({
        code: districtCode,
      });
      const existedWards = await this.wardService.getAll({
        districtCode,
        websiteId,
      });
      const existedWardGhnRefIds = existedWards.items.map((ward) => ward.ghnRefId);

      const response = await this.httpService.axiosRef.get('master-data/ward', {
        params: {
          district_id: district.ghnRefId,
        },
      });

      return this.format<IWard>(
        response.data.data,
        ['WardCode', 'WardName', 'DistrictID'],
        ['ghnRefId', 'name', 'districtGhnRefId'],
        {
          districtCode,
        },
      )
        .map((item) => ({
          ...item,
          ghnRefId: Number(item.ghnRefId),
        }))
        .filter((ward) => !existedWardGhnRefIds.includes(ward.ghnRefId));
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async getWard(districtCode: string, refId: number) {
    const wards = await this.getWards(districtCode);

    const ward = wards.find((ward) => ward.ghnRefId === refId);

    if (!ward) {
      throw new UnprocessableEntityException(LOCATION_ERROR_CODE.WARD_NOT_EXISTS);
    }

    return ward;
  }

  private format<T = unknown>(
    data: T[],
    originalKeys: string[],
    newKeys: string[],
    extraData: Record<string, unknown> = {},
  ): T[] {
    return data.map((item) => {
      const newItem = {} as T;
      originalKeys.forEach((key, index) => {
        newItem[newKeys[index]] = item[key];
      });
      return {
        ...newItem,
        ...extraData,
      };
    });
  }
}
