import { IRole } from '@encacap-group/types/dist/account';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  create(role: IRole) {
    return this.roleRepository.save(role);
  }

  async findOne(query: FindOptionsWhere<RoleEntity>) {
    const role = await this.roleRepository.findOneBy(query);

    if (!role) {
      throw new NotFoundException('ROLE_NOT_FOUND');
    }

    return role;
  }
}
