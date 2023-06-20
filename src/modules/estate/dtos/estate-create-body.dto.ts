import { ESTATE_QUARTER_ENUM, ESTATE_STATUS_ENUM, UNIT_PRICE_TYPE_ENUM } from '@encacap-group/common/dist/re';
import { ImageNotExistsValidator } from '@modules/image/validators/image-not-exists.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { CategoryExistsValidator } from 'src/modules/category/validators/category-exists.validator';
import { CategoryPropertyExistsValidator } from 'src/modules/category/validators/category-property-exists.validator';
import { ContactNotExistsValidator } from 'src/modules/contact/validators/contact-not-exists.validator';
import { DistrictExistsValidator } from 'src/modules/location/validators/district-exists.validator';
import { ProvinceExistsValidator } from 'src/modules/location/validators/province-exists.validator';
import { WardExistsValidator } from 'src/modules/location/validators/ward-exists.validator';
import { UnitPriceExistsValidator } from 'src/modules/unit-price/validators/unit-price-exists.validator';
import { IEstateProperty } from '../interfaces/estate-property.interface';

export class EstateCreateBodyDto {
  @IsString()
  @Validate(ProvinceExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  @ApiProperty({ name: 'province_code', description: 'Mã tỉnh/thành phố' })
  provinceCode!: string;

  @IsString()
  @Validate(DistrictExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  @ApiProperty({ name: 'district_code', description: 'Mã quận/huyện' })
  districtCode!: string;

  @IsString()
  @Validate(WardExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  @ApiProperty({ name: 'ward_code', description: 'Mã phường/xã' })
  wardCode!: string;

  @IsString()
  @ApiProperty({ name: 'address', description: 'Địa chỉ' })
  address!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ name: 'address_note', description: 'Ghi chú địa chỉ' })
  address_note?: string;

  @IsLatitude()
  @ApiProperty({ name: 'latitude', description: 'Vĩ độ' })
  latitude!: number;

  @IsLongitude()
  @ApiProperty({ name: 'longitude', description: 'Kinh độ' })
  longitude!: number;

  @IsString()
  @ApiProperty({ name: 'title', description: 'Tiêu đề' })
  title!: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ name: 'area', description: 'Diện tích' })
  area!: number;

  @IsNumber()
  @Type(() => Number)
  @Validate(UnitPriceExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, UNIT_PRICE_TYPE_ENUM.AREA])
  @ApiProperty({ name: 'area_unit_id', description: 'Đơn vị diện tích' })
  areaUnitId!: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ name: 'price', description: 'Giá' })
  price!: number;

  @IsNumber()
  @Type(() => Number)
  @Validate(UnitPriceExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, UNIT_PRICE_TYPE_ENUM.PRICE])
  @ApiProperty({ name: 'price_unit_id', description: 'Đơn vị giá' })
  priceUnitId!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ name: 'custom_id', description: 'Mã tùy chỉnh' })
  customId?: string;

  @IsString()
  @ApiProperty({ name: 'description', description: 'Mô tả' })
  description!: string;

  @IsNumber()
  @Type(() => Number)
  @Validate(CategoryExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'id'])
  @ApiProperty({ name: 'category_id', description: 'Mã danh mục' })
  categoryId!: number;

  @IsNumber()
  @Type(() => Number)
  @Validate(ContactNotExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  @ApiProperty({ name: 'contact_id', description: 'Mã liên hệ' })
  contactId!: number;

  @IsString()
  @ApiProperty({ name: 'avatar_id', description: 'Mã ảnh đại diện' })
  avatarId!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ name: 'youtube_id', description: 'Mã youtube' })
  youtubeId?: string;

  @IsOptional()
  @IsEnum(ESTATE_QUARTER_ENUM)
  @ApiPropertyOptional({
    name: 'quarter_code',
    description: 'Mã hướng bất động sản',
    enumName: 'ESTATE_QUARTER_ENUM',
    enum: ESTATE_QUARTER_ENUM,
  })
  quarterCode?: ESTATE_QUARTER_ENUM;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;

  @IsOptional()
  @IsEnum(ESTATE_STATUS_ENUM)
  @ApiPropertyOptional({
    name: 'status',
    description: 'Trạng thái',
    enumName: 'ESTATE_STATUS_ENUM',
    enum: ESTATE_STATUS_ENUM,
  })
  status?: ESTATE_STATUS_ENUM;

  @IsArray()
  @Type(() => IEstateProperty)
  @Validate(CategoryPropertyExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'id'], {
    each: true,
  })
  @ApiProperty({ name: 'properties', description: 'Thuộc tính', isArray: true })
  properties!: IEstateProperty[];

  @IsArray()
  @Type(() => String)
  @Validate(ImageNotExistsValidator, [EXIST_VALIDATOR_TYPE.NOT_EXISTS], {
    each: true,
  })
  @ApiProperty({ name: 'image_ids', description: 'Mã ảnh', isArray: true })
  imageIds!: string[];
}
