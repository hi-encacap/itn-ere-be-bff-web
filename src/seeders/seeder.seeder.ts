import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { AppConfigModule } from 'src/configs/config.module';
import { CloudflareVariantWebsiteEntity } from 'src/modules/cloudflare/entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { PostgresDatabaseProviderModule } from 'src/providers/postgres/postgres.module';
import { CloudflareVariantSeeder } from './cloudflare-variant.seeder';
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
      ContactEntity,
    ]),
  ],
}).run([WebsiteSeeder, RoleSeeder, UserSeeder, CloudflareVariantSeeder]);
