import { Type } from 'class-transformer';
import { IsEnum, IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { ESTATE_QUARTER_ENUM, ESTATE_STATUS_ENUM, UNIT_PRICE_TYPE_ENUM } from 'encacap/dist/re';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { CategoryExistsValidator } from 'src/modules/category/validators/category-exists.validator';
import { ContactExistsValidator } from 'src/modules/contact/validators/contact-exists.validator';
import { DistrictExistsValidator } from 'src/modules/location/validators/district-exists.validator';
import { ProvinceExistsValidator } from 'src/modules/location/validators/province-exists.validator';
import { WardExistsValidator } from 'src/modules/location/validators/ward-exists.validator';
import { UnitPriceExistsValidator } from 'src/modules/unit-price/validators/unit-price-exists.validator';

export class EstateCreateBodyDto {
  @IsString()
  @Validate(ProvinceExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  provinceCode!: string;

  @IsString()
  @Validate(DistrictExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  districtCode!: string;

  @IsString()
  @Validate(WardExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  wardCode!: string;

  @IsString()
  address!: string;

  @IsOptional()
  @IsString()
  address_note?: string;

  @IsLatitude()
  latitude!: number;

  @IsLongitude()
  longitude!: number;

  @IsString()
  title!: string;

  @IsNumber()
  @Type(() => Number)
  area!: number;

  @IsNumber()
  @Type(() => Number)
  @Validate(UnitPriceExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, UNIT_PRICE_TYPE_ENUM.AREA])
  areaUnitId!: number;

  @IsNumber()
  @Type(() => Number)
  price!: number;

  @IsNumber()
  @Type(() => Number)
  @Validate(UnitPriceExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, UNIT_PRICE_TYPE_ENUM.PRICE])
  priceUnitId!: number;

  @IsOptional()
  @IsString()
  customId?: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Type(() => Number)
  @Validate(CategoryExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'id'])
  categoryId!: number;

  @IsNumber()
  @Type(() => Number)
  @Validate(ContactExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  contactId!: number;

  @IsString()
  avatarId!: string;

  @IsOptional()
  @IsString()
  youtubeId?: string;

  @IsEnum(ESTATE_QUARTER_ENUM)
  quarterCode!: ESTATE_QUARTER_ENUM;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;

  @IsOptional()
  @IsEnum(ESTATE_STATUS_ENUM)
  status?: ESTATE_STATUS_ENUM;
}
