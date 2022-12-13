import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DISTRICT_ERROR_CODE, PROVINCE_ERROR_CODE } from '../constants/error.constant';
import { DistrictListQueryDto } from '../dto/district-list-query.dto';
import { WardListQueryDto } from '../dto/ward-list-query.dto';
import { IGHNDistrict, IGHNProvince, IGHNWard } from '../interfaces/ghn.interface';

@Injectable()
export class GHNService {
  constructor(private readonly httpService: HttpService) {}

  async getProvinces() {
    try {
      const {
        data: { data },
      } = await this.httpService.axiosRef.get('master-data/province');
      return this.mapToProvinceResponseData(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getProvinceById(id: number) {
    const provinces = await this.getProvinces();
    const province = provinces.find((item) => item.id === id);

    if (!province) {
      throw new NotFoundException(PROVINCE_ERROR_CODE.NOT_EXISTS);
    }

    return province;
  }

  async getDistricts({ provinceId }: DistrictListQueryDto) {
    try {
      const {
        data: { data },
      } = await this.httpService.axiosRef.get('master-data/district', {
        params: {
          province_id: provinceId,
        },
      });
      return this.mapToDistrictResponseData(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getDistrictById(id: number) {
    const districts = await this.getDistricts({ provinceId: null });

    const district = districts.find((item) => item.id === id);

    if (!district) {
      throw new NotFoundException(DISTRICT_ERROR_CODE.NOT_EXISTS);
    }

    return district;
  }

  async getWards(query: WardListQueryDto) {
    try {
      const {
        data: { data },
      } = await this.httpService.axiosRef.get('master-data/ward', {
        params: {
          district_id: query.districtId ?? null,
        },
      });
      return this.mapToWardResponseData(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private mapToProvinceResponseData(data: IGHNProvince[]) {
    return data.map((item) => ({
      id: item.ProvinceID,
      name: item.ProvinceName,
    }));
  }

  private mapToDistrictResponseData(data: IGHNDistrict[]) {
    return data.map((item) => ({
      id: item.DistrictID,
      name: item.DistrictName,
      provinceId: item.ProvinceID,
    }));
  }

  private mapToWardResponseData(data: IGHNWard[]) {
    return data.map((item) => ({
      id: item.WardCode,
      name: item.WardName,
      districtId: item.DistrictID,
    }));
  }
}
