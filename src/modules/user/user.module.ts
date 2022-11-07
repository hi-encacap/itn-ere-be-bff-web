import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteModule } from '../website/website.module';
import { RootRoleController } from './controllers/root-role.controller';
import { RootUserController } from './controllers/root-user.controller';
import { RoleEntity } from './entities/role.entity';
import { UserRoleMappingEntity } from './entities/user-role-mapping.entity';
import { UserEntity } from './entities/user.entity';
import { RoleService } from './services/role.service';
import { UserRoleMappingService } from './services/user-role-mapping.service';
import { UserService } from './services/user.service';
import { EmailExistsValidator } from './validators/email-exists.validator';
import { RoleArrayNotExistsValidator } from './validators/role-array-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRoleMappingEntity, RoleEntity]), WebsiteModule],
  controllers: [RootUserController, RootRoleController],
  providers: [
    UserService,
    UserRoleMappingService,
    RoleService,

    // Validators
    RoleArrayNotExistsValidator,
    EmailExistsValidator,
  ],
  exports: [UserService, UserRoleMappingService, RoleService],
})
export class UserModule {}
