import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getDistricts({ provinceId }: DistrictListQueryDto) {
    console.log(provinceId);
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
