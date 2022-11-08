import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import AppConfigService from 'src/configs/config.service';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { Repository } from 'typeorm';
import { roleItems } from './role.seeder';
import { websiteItems } from './website.seeder';

const userItems: IUser[] = [
  {
    id: 1,
    email: 'encacap@re.encacap.com',
    username: 'encacap',
    password: '123456',
    firstName: 'Khac Khanh',
    lastName: 'Nguyen',
    website: websiteItems[0],
    roles: roleItems,
  },
];

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleMappingEntity)
    private readonly userRoleMappingRepository: Repository<UserRoleMappingEntity>,
    private readonly configService: AppConfigService,
  ) {}

  async upsertUserItem(item: IUser | UserEntity) {
    let record = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: item.email })
      .getOne();

    const hashedPassword = await UserEntity.hashPassword(this.configService.rootPassword || item.password);

    const newItem = {
      email: item.email,
      username: item.username,
      password: hashedPassword,
      firstName: item.firstName,
      lastName: item.lastName,
      website: item.website,
    };

    if (record) {
      await this.userRepository
        .createQueryBuilder()
        .update()
        .set(newItem)
        .where('id = :id', { id: record.id })
        .execute();
    } else {
      record = await this.userRepository.save(newItem);
    }

    const userRoleMappingItems = item.roles.map((role) => ({
      userId: record.id,
      roleId: role.id,
    }));

    await this.userRoleMappingRepository.delete({ userId: record.id });

    return this.userRoleMappingRepository.save(userRoleMappingItems);
  }

  seed() {
    const seedTasks = userItems.map((item) => this.upsertUserItem(item));
    return Promise.all(seedTasks);
  }

  drop() {
    return Promise.all([this.userRepository.delete({}), this.userRoleMappingRepository.delete({})]);
  }
}
