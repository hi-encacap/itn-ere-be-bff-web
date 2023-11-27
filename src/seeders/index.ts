import { CategoryEntity } from '@modules/category/entities/category.entity';
import { WebsiteConfigEntity } from '@modules/configs/entities/website-config,entity';
import { ContactEntity } from '@modules/contact/entities/contact.entity';
import { ImageVariantEntity } from '@modules/image/entities/image-variant.entity';
import { ImageEntity } from '@modules/image/entities/image.entity';
import { PermissionEntity } from '@modules/permission/entities/permission.entity';
import { UserPermissionEntity } from '@modules/permission/entities/user-permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { AppConfigModule } from 'src/configs/app/config.module';
import { CategoryGroupEntity } from 'src/modules/category/entities/category-group.entity';
import { EstateQuarterEntity } from 'src/modules/estate/entities/estate-quarter.entity';
import { UnitPriceEntity } from 'src/modules/unit-price/entities/unit-price.entity';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { PostgresDatabaseProviderModule } from 'src/providers/postgres/postgres.module';
import { CategoryGroupSeeder } from './category-group.seeder';
import { CloudflareVariantSeeder } from './cloudflare-variant.seeder';
import { EstateQuarterSeeder } from './estate-quarter.seeder';
import { PermissionSeeder } from './permission.seeder';
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
      ImageVariantEntity,
      CategoryGroupEntity,
      EstateQuarterEntity,
      UnitPriceEntity,
      ContactEntity,
      ImageEntity,
      ImageVariantEntity,
      WebsiteConfigEntity,
      CategoryEntity,
      PermissionEntity,
      UserPermissionEntity,
    ]),
  ],
}).run([
  PermissionSeeder,
  RoleSeeder,
  WebsiteSeeder,
  UserSeeder,
  CloudflareVariantSeeder,
  CategoryGroupSeeder,
  EstateQuarterSeeder,
  UnitPriceSeeder,
]);
