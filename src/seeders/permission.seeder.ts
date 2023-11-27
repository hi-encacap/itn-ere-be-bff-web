import { IPermission, PERMISSION_CODE_ENUM } from '@encacap-group/common/dist/account';
import { PermissionEntity } from '@modules/permission/entities/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { values } from 'lodash';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';

const items: IPermission[] = values(PERMISSION_CODE_ENUM).map((code) => ({
  code,
  name: code,
  description: null,
}));

@Injectable()
export class PermissionSeeder implements Seeder {
  constructor(
    @InjectRepository(PermissionEntity) private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async upsertItem(item: IPermission) {
    const record = await this.permissionRepository.findOneBy({ code: item.code });

    if (record) {
      return this.permissionRepository.update(record.code, item);
    }

    return this.permissionRepository.save(item);
  }

  seed() {
    const seedTasks = items.map((item) => this.upsertItem(item));
    return Promise.all(seedTasks);
  }

  drop() {
    return this.permissionRepository.delete({});
  }
}
