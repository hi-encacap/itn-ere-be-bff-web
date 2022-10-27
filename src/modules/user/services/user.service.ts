import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { UserRoleMappingEntity } from '../entities/user-role-mapping.entity';
import { UserEntity } from '../entities/user.entity';
import { UserRoleMappingService } from './user-role-mapping.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userRoleMappingService: UserRoleMappingService,
  ) {}

  async findAll() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.website', 'website')
      .leftJoin(UserRoleMappingEntity, 'user_role', 'user_role.user_id = user.id')
      .leftJoinAndMapMany('user.roles', RoleEntity, 'role', 'role.id = user_role.role_id')
      .getMany();

    return users;
  }

  async create(body: UserEntity) {
    const user = await this.userRepository.save(body);
    await this.userRoleMappingService.create(user.id, body.roleIds);
    return user;
  }
}
