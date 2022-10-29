import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { IRole } from 'src/modules/user/constants/user.interface';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { Repository } from 'typeorm';

export const roleItems: IRole[] = [
  {
    id: 1,
    name: 'Root',
    slug: 'root',
  },
  {
    id: 2,
    name: 'Manager',
    slug: 'manager',
  },
];

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(@InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>) {}

  async upsertItem(item: IRole) {
    const record = await this.roleRepository.findOneBy({ id: item.id });

    if (record) {
      return this.roleRepository.update(record.id, item);
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
