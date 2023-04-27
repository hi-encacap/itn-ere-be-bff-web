import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { AppConfigModule } from 'src/configs/config.module';
import { CategoryGroupWebsiteEntity } from 'src/modules/category/entities/category-group-website.entity';
import { CategoryGroupEntity } from 'src/modules/category/entities/category-group.entity';
import { CategoryPropertyEntity } from 'src/modules/category/entities/category-property.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { ConfigWebsiteEntity } from 'src/modules/configs/entities/config-website.entity';
import { ConfigEntity } from 'src/modules/configs/entities/config.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { EstateImageEntity } from 'src/modules/estate/entities/estate-image.entity';
import { EstatePropertyEntity } from 'src/modules/estate/entities/estate-property.entity';
import { EstateQuarterEntity } from 'src/modules/estate/entities/estate-quarter.entity';
import { EstateEntity } from 'src/modules/estate/entities/estate.entity';
import { DistrictEntity } from 'src/modules/location/entities/district.entity';
import { ProvinceEntity } from 'src/modules/location/entities/province.entity';
import { WardEntity } from 'src/modules/location/entities/ward.entity';
import { UnitPriceEntity } from 'src/modules/unit-price/entities/unit-price.entity';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { PostgresDatabaseProviderModule } from 'src/providers/postgres/postgres.module';
import { CategoryGroupSeeder } from './category-group.seeder';
import { CloudflareVariantSeeder } from './cloudflare-variant.seeder';
import { ConfigSeeder } from './config.seeder';
import { EstateQuarterSeeder } from './estate-quarter.seeder';
import { RoleSeeder } from './role.seeder';
import { UnitPriceSeeder } from './unit-price.seeder';
import { UserSeeder } from './user.seeder';
import { WebsiteSeeder } from './website.seeder';

seeder({
  imports: [
    AppConfigModule,
    PostgresDatabaseProviderModule,
    TypeOrmModule.forFeature([
      WebsiteEntity,
      RoleEntity,
      UserEntity,
      UserRoleMappingEntity,
      CloudflareVariantEntity,
      CloudflareImageEntity,
      ContactEntity,
      CategoryGroupEntity,
      CategoryGroupWebsiteEntity,
      CategoryEntity,
      CategoryPropertyEntity,
      EstateQuarterEntity,
      UnitPriceEntity,
      EstatePropertyEntity,
      EstateImageEntity,
      EstateEntity,
      ProvinceEntity,
      DistrictEntity,
      WardEntity,
      ConfigEntity,
      ConfigWebsiteEntity,
    ]),
  ],
}).run([
  RoleSeeder,
  WebsiteSeeder,
  UserSeeder,
  CloudflareVariantSeeder,
  CategoryGroupSeeder,
  EstateQuarterSeeder,
  UnitPriceSeeder,
  ConfigSeeder,
]);
