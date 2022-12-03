import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { capitalize, omit, values } from 'lodash';
import { Seeder } from 'nestjs-seeder';
import { ROLE_ENUM } from 'src/common/constants/role.constant';
import { CATEGORY_GROUP_ENUM } from 'src/modules/category/constants/category-group.constant';
import { CategoryGroupEntity } from 'src/modules/category/entities/category-group.entity';
import { ICategoryGroup } from 'src/modules/category/interfaces/category-group.interface';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

export const categoryGroupItems: Array<Partial<ICategoryGroup>> = values(CATEGORY_GROUP_ENUM).map(
  (categoryGroup) => ({
    name: capitalize(categoryGroup),
    code: categoryGroup,
  }),
);

@Injectable()
export class CategoryGroupSeeder implements Seeder {
  constructor(
    @InjectRepository(CategoryGroupEntity)
    private readonly categoryGroupRepository: Repository<CategoryGroupEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async upsertItem(item: Partial<ICategoryGroup>, userId: number) {
    const record = await this.categoryGroupRepository.findOneBy({ code: item.code });
    let updatedItem = { ...item, userId };

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
      throw new BadRequestException('Root user not found');
    }

    const seedTasks = categoryGroupItems.map((item) => this.upsertItem(item, rootUser.id));
    return Promise.all(seedTasks);
  }

  drop() {
    return this.categoryGroupRepository.delete({});
  }
}
