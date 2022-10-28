import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';
import { RoleEntity } from './entities/role.entity';
import { UserRoleMappingEntity } from './entities/user-role-mapping.entity';
import { UserEntity } from './entities/user.entity';
import { RoleService } from './services/role.service';
import { UserRoleMappingService } from './services/user-role-mapping.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRoleMappingEntity, RoleEntity])],
  controllers: [UserController, RoleController],
  providers: [UserService, UserRoleMappingService, RoleService],
})
export class UserModule {}
