import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Seeder } from 'nestjs-seeder';
import { ROLE_ENUM } from 'src/common/constants/role.constant';
import { CategoryGroupEntity } from 'src/modules/category/entities/category-group.entity';
import { ICategoryGroup } from 'src/modules/category/interfaces/category-group.interface';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { Repository } from 'typeorm';

export const categoryGroupItems: Array<ICategoryGroup> = [
  {
    code: 'estate',
    name: 'Estate',
    userId: 0,
  },
  {
    code: 'news',
    name: 'News',
    userId: 0,
  },
];

@Injectable()
export class CategoryGroupSeeder implements Seeder {
  private rootUser: IUser;

  constructor(
    @InjectRepository(CategoryGroupEntity)
    private readonly categoryGroupRepository: Repository<CategoryGroupEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async upsertItem(item: ICategoryGroup) {
    const record = await this.categoryGroupRepository.findOneBy({ code: item.code });
    let updatedItem = { ...item, userId: this.rootUser.id };

    if (record) {
      updatedItem = { ...record, ...omit(item, ['code']) };
    }

    return this.categoryGroupRepository.save(updatedItem);
  }

  async seed() {
    const rootUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin(UserRoleMappingEntity, 'user_role_mapping', 'user.id = user_role_mapping.user_id')
      .leftJoin(RoleEntity, 'role', 'user_role_mapping.role_id = role.id')
      .where('role.slug = :slug', { slug: ROLE_ENUM.ROOT })
      .getOne();

    if (!rootUser) {
      return undefined;
    }

    this.rootUser = rootUser;

    const seedTasks = categoryGroupItems.map((item) => this.upsertItem(item));
    return Promise.all(seedTasks);
  }

  drop() {
    return this.categoryGroupRepository.delete({});
  }
}
