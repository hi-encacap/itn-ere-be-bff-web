import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { AppConfigModule } from 'src/configs/config.module';
import { CategoryGroupWebsiteEntity } from 'src/modules/category/entities/category-group-website.entity';
import { CategoryGroupEntity } from 'src/modules/category/entities/category-group.entity';
import { CategoryPropertyEntity } from 'src/modules/category/entities/category-property.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { CloudflareVariantWebsiteEntity } from 'src/modules/cloudflare/entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { EstateQuarterEntity } from 'src/modules/estate/entities/estate-quarter.entity';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { PostgresDatabaseProviderModule } from 'src/providers/postgres/postgres.module';
import { CategoryGroupWebsiteSeeder } from './category-group-website.seeder';
import { CategoryGroupSeeder } from './category-group.seeder';
import { CloudflareVariantSeeder } from './cloudflare-variant.seeder';
import { EstateQuarterSeeder } from './estate-quarter.seeder';
import { RoleSeeder } from './role.seeder';
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
      CloudflareVariantWebsiteEntity,
      CloudflareImageEntity,
      ContactEntity,
      CategoryGroupEntity,
      CategoryGroupWebsiteEntity,
      CategoryEntity,
      CategoryPropertyEntity,
      EstateQuarterEntity,
    ]),
  ],
}).run([
  WebsiteSeeder,
  RoleSeeder,
  UserSeeder,
  CloudflareVariantSeeder,
  CategoryGroupSeeder,
  CategoryGroupWebsiteSeeder,
  EstateQuarterSeeder,
]);
