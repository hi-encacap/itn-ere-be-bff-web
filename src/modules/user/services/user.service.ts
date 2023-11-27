import { ImageVariantEntity } from '@modules/image/entities/image-variant.entity';
import { ImageService } from '@modules/image/services/image.service';
import { PermissionEntity } from '@modules/permission/entities/permission.entity';
import { UserPermissionEntity } from '@modules/permission/entities/user-permission.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _, { omit, pick } from 'lodash';
import { BaseService } from 'src/base/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RootUserCreateBodyDto } from '../dtos/root-user-create-body.dto';
import { RootUserUpdateBodyDto } from '../dtos/root-user-update-body.dto';
import { RoleEntity } from '../entities/role.entity';
import { UserRoleMappingEntity } from '../entities/user-role-mapping.entity';
import { UserEntity } from '../entities/user.entity';
import { UserRoleMappingService } from './user-role-mapping.service';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly userRoleMappingService: UserRoleMappingService,
    private readonly imageService: ImageService,
  ) {
    super();
  }

  async findAll() {
    const users = await this.queryBuilder.getMany();

    this.imageService.mapVariantToImage(users, 'avatar');

    return users;
  }

  findOne(query: FindOptionsWhere<UserEntity>, orQuery?: FindOptionsWhere<UserEntity>) {
    const queryBuilder = this.queryBuilder;

    if (query) {
      queryBuilder.where(query);
    }

    if (orQuery) {
      queryBuilder.orWhere(orQuery);
    }

    return queryBuilder.getOne();
  }

  async findOneById(id: number) {
    const user = await this.findOne({ id });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    return omit(user, ['password']);
  }

  findOneByUsernameOrEmail(usernameOrEmail: string) {
    return this.findOne({}, { email: usernameOrEmail, username: usernameOrEmail });
  }

  async create(body: RootUserCreateBodyDto) {
    const user = await this.userRepository.save({
      ...body,
      password: await UserEntity.hashPassword(body.password),
    });
    await this.userRoleMappingService.create(user.id, body.roleIds);
    return _.omit(user, ['password']);
  }

  async update(id: number, body: RootUserUpdateBodyDto) {
    const record = await this.findOneById(id);

    if (body.password) {
      body.password = await UserEntity.hashPassword(body.password);
    }

    await this.userRepository
      .createQueryBuilder('user')
      .update(UserEntity)
      .set(pick({ ...record, ...body }, ['email', 'password', 'firstName', 'lastName', 'websiteId']))
      .where('id = :id', { id })
      .execute();

    if (body.roleIds) {
      await this.userRoleMappingService.deleteByUserId(id);
      await this.userRoleMappingService.create(id, body.roleIds);
    }

    return this.findOneById(id);
  }

  updatePassword(id: number, password: string) {
    return this.update(id, { password });
  }

  async deleteById(id: number) {
    const record = await this.findOneById(id);

    await this.userRoleMappingService.deleteByUserId(record.id);
    await this.userRepository.delete({ id: record.id });
  }

  private get queryBuilder() {
    return (
      this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.website', 'website')
        .leftJoin(UserRoleMappingEntity, 'userRole', 'userRole.userId = user.id')
        .leftJoinAndMapMany('user.roles', RoleEntity, 'role', 'role.id = userRole.roleId')
        .leftJoinAndSelect('user.avatar', 'avatar')
        .leftJoinAndMapMany('avatar.variants', ImageVariantEntity, 'variant', 'variant.isDefault = TRUE')
        // .leftJoinAndSelect('user.permissions', 'permission');
        .leftJoin(UserPermissionEntity, 'userPermission', 'userPermission.userId = user.id')
        .leftJoinAndMapMany(
          'user.permissions',
          PermissionEntity,
          'permission',
          'permission.code = userPermission.permissionCode',
        )
    );
  }
}
