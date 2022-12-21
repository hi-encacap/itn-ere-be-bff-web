import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, UnprocessableEntityException, forwardRef } from '@nestjs/common';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { IDistrict, IProvince, IWard } from '../interfaces/location.interface';
import { DistrictService } from './district.service';
import { ProvinceService } from './province.service';

@Injectable()
export class GHNService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => ProvinceService)) private readonly provinceService: ProvinceService,
    @Inject(forwardRef(() => DistrictService)) private readonly districtService: DistrictService,
  ) {}

  async getProvinces(): Promise<IProvince[]> {
    try {
      const response = await this.httpService.axiosRef.get('master-data/province');
      return this.format<IProvince>(
        response.data.data,
        ['ProvinceID', 'ProvinceName', 'CountryID'],
        ['ghnRefId', 'name', 'countryId'],
      );
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

  async getDistricts(provinceCode: string): Promise<IDistrict[]> {
    try {
      const province = await this.provinceService.getByCode(provinceCode);

      const response = await this.httpService.axiosRef.get('master-data/district', {
        params: {
          province_id: province.ghnRefId,
        },
      });

      return this.format(
        response.data.data,
        ['DistrictID', 'DistrictName', 'ProvinceID'],
        ['ghnRefId', 'name', 'provinceGhnRefId'],
        { provinceCode },
      );
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

  async getWards(districtCode: string): Promise<IWard[]> {
    try {
      const district = this.districtService.getByCode(districtCode);

      const response = await this.httpService.axiosRef.get('master-data/ward', {
        params: {
          district_id: district.ghnRefId,
        },
      });

      return this.format(
        response.data.data,
        ['WardCode', 'WardName', 'DistrictID'],
        ['ghnRefId', 'name', 'districtGhnRefId'],
        {
          districtCode,
        },
      );
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
