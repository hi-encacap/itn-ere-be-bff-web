import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootPermissionController } from './controllers/root-permission.controller';
import { PermissionEntity } from './entities/permission.entity';
import { UserPermissionEntity } from './entities/user-permission.entity';
import { PermissionService } from './services/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity, UserPermissionEntity])],
  controllers: [RootPermissionController],
  providers: [PermissionService],
  exports: [],
})
export class PermissionModule {}
