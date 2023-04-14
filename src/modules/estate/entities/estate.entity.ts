import { ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { DistrictEntity } from 'src/modules/location/entities/district.entity';
import { ProvinceEntity } from 'src/modules/location/entities/province.entity';
import { WardEntity } from 'src/modules/location/entities/ward.entity';
import { UnitPriceEntity } from 'src/modules/unit-price/entities/unit-price.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EstateImageEntity } from './estate-image.entity';
import { EstatePropertyEntity } from './estate-property.entity';
import { EstateQuarterEntity } from './estate-quarter.entity';

@Entity({ name: 'estates' })
export class EstateEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column({
    name: 'upvoted_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  upvotedAt: Date;

  @Column({ name: 'province_code' })
  provinceCode: string;

  @Column({ name: 'district_code' })
  districtCode: string;

  @Column({ name: 'ward_code' })
  wardCode: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'address_note', nullable: true })
  addressNote: string;

  @Column({ name: 'latitude', nullable: true })
  latitude: number;

  @Column({ name: 'longitude', nullable: true })
  longitude: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'square' })
  area: number;

  @Column({ name: 'area_unit_id' })
  areaUnitId: number;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'price_unit_id' })
  priceUnitId: number;

  @Column({ name: 'custom_id', nullable: true })
  customId: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'contact_id' })
  contactId: number;

  @Column({ name: 'avatar_id', nullable: true })
  avatarId: string;

  @Column({ name: 'youtube_id', nullable: true })
  youtubeId: string;

  @Column({ name: 'quarter_code', nullable: true })
  quarterCode: string;

  @Column({ name: 'website_id' })
  websiteId: number;

  @Column({ name: 'status', type: 'enum', enum: ESTATE_STATUS_ENUM })
  status: ESTATE_STATUS_ENUM;

  // Relations
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;

  @ManyToOne(() => ContactEntity)
  @JoinColumn({ name: 'contact_id', referencedColumnName: 'id' })
  contact: ContactEntity;

  @ManyToOne(() => CloudflareImageEntity)
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar: CloudflareImageEntity;

  @ManyToOne(() => EstateQuarterEntity)
  @JoinColumn({ name: 'quarter_code', referencedColumnName: 'code' })
  quarter: EstateQuarterEntity;

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

  @ManyToOne(() => UnitPriceEntity)
  @JoinColumn({ name: 'area_unit_id', referencedColumnName: 'id' })
  areaUnit: UnitPriceEntity;

  @ManyToOne(() => UnitPriceEntity)
  @JoinColumn({ name: 'price_unit_id', referencedColumnName: 'id' })
  priceUnit: UnitPriceEntity;

  @OneToMany(() => EstatePropertyEntity, (estateProperty) => estateProperty.estate, {
    cascade: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'estate_id' })
  properties: EstatePropertyEntity[];

  @OneToMany(() => EstateImageEntity, (estateImage) => estateImage.estate, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'estate_id' })
  images: EstateImageEntity[];
}
