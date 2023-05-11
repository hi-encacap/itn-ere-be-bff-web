import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Seeder } from 'nestjs-seeder';
import { ROLE_SLUG_ENUM } from 'src/common/constants/role.constant';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { Repository } from 'typeorm';

export const roleItems: Array<Partial<RoleEntity>> = [
  {
    name: 'Root',
    slug: ROLE_SLUG_ENUM.ROOT,
  },
  {
    name: 'Admin',
    slug: ROLE_SLUG_ENUM.ADMIN,
  },
  {
    name: 'Manager',
    slug: ROLE_SLUG_ENUM.MANAGER,
  },
];

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async upsertItem(item: Partial<RoleEntity>) {
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
