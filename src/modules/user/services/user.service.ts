import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _, { omit, pick } from 'lodash';
import { BaseService } from 'src/base/base.service';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RootCreateUserDto } from '../dto/root-create-user.dto';
import { RootUpdateUserDto } from '../dto/root-update-user.dto';
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
    private readonly cloudflareImageService: CloudflareImageService,
  ) {
    super();
  }

  async findAll() {
    const users = await this.queryBuilder.getMany();

    this.cloudflareImageService.mapVariantToImage(users, 'avatar');

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

  async create(body: RootCreateUserDto) {
    const user = await this.userRepository.save({
      ...body,
      password: await UserEntity.hashPassword(body.password),
    });
    await this.userRoleMappingService.create(user.id, body.roleIds);
    return _.omit(user, ['password']);
  }

  async update(id: number, body: RootUpdateUserDto) {
    const record = await this.findOneById(id);

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

  async deleteById(id: number) {
    const record = await this.findOneById(id);

    await this.userRoleMappingService.deleteByUserId(record.id);
    await this.userRepository.delete({ id: record.id });
  }

  private get queryBuilder() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.website', 'website')
      .leftJoin(UserRoleMappingEntity, 'user_role', 'user_role.user_id = user.id')
      .leftJoinAndMapMany('user.roles', RoleEntity, 'role', 'role.id = user_role.role_id')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndMapMany('avatar.variants', CloudflareVariantEntity, 'variant', 'variant.is_default = TRUE');
  }
}
