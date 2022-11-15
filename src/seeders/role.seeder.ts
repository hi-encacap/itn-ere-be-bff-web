import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Seeder } from 'nestjs-seeder';
import { ROLE_ENUM } from 'src/common/constants/role.constant';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { IRole } from 'src/modules/user/interfaces/user.interface';
import { Repository } from 'typeorm';

export const roleItems: IRole[] = [
  {
    id: 1,
    name: 'Root',
    slug: ROLE_ENUM.ROOT,
  },
  {
    id: 2,
    name: 'Admin',
    slug: ROLE_ENUM.ADMIN,
  },
  {
    id: 3,
    name: 'Manager',
    slug: ROLE_ENUM.MANAGER,
  },
];

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserRoleMappingEntity)
    private readonly userRoleRepository: Repository<UserRoleMappingEntity>,
  ) {}

  async upsertItem(item: IRole) {
    const record = await this.roleRepository.findOneBy({ slug: item.slug });

    if (record) {
      return this.roleRepository.update(record.id, omit(item, ['id']));
    }

    return this.roleRepository.save(item);
  }

  seed() {
    const seedTasks = roleItems.map((item) => this.upsertItem(item));
    return Promise.all(seedTasks);
  }

  drop() {
    return this.roleRepository.delete({});
  }
}
