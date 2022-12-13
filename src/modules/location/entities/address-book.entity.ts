import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LOCATION_TYPE_ENUM } from '../constants/location.constant';
import { DistrictEntity } from './district.entity';
import { ProvinceEntity } from './province.entity';
import { WardEntity } from './ward.entity';

@Entity({ name: 'address_books' })
export class AddressBookEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column({ name: 'province_code' })
  provinceCode: string;

  @Column({ name: 'district_code' })
  districtCode: string;

  @Column({ name: 'ward_code' })
  wardCode: string;

  @Column({ name: 'latitude' })
  latitude: number;

  @Column({ name: 'longitude' })
  longitude: number;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'type' })
  type: LOCATION_TYPE_ENUM;

  @Column({ name: 'website_id' })
  websiteId: number;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;

  @ManyToOne(() => ProvinceEntity)
  @JoinColumn({ name: 'province_code', referencedColumnName: 'code' })
  province: ProvinceEntity;

  @ManyToOne(() => DistrictEntity)
  @JoinColumn({ name: 'district_code', referencedColumnName: 'code' })
  district: DistrictEntity;

  @ManyToOne(() => WardEntity)
  @JoinColumn({ name: 'ward_code', referencedColumnName: 'code' })
  ward: WardEntity;
}
