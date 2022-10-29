import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { DatabaseModule } from 'src/configs/database/database.module';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { RoleSeeder } from './role.seeder';
import { UserSeeder } from './user.seeder';
import { WebsiteSeeder } from './website.seeder';

seeder({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([WebsiteEntity, RoleEntity, UserEntity, UserRoleMappingEntity]),
  ],
}).run([WebsiteSeeder, RoleSeeder, UserSeeder]);
