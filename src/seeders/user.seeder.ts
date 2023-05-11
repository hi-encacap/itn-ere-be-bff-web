import { IREUser, WEBSITE_DOMAIN_ENUM } from '@encacap-group/types/dist/re';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { ROLE_SLUG_ENUM } from 'src/common/constants/role.constant';
import AppConfigService from 'src/configs/app/config.service';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserRoleMappingEntity } from 'src/modules/user/entities/user-role-mapping.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Repository } from 'typeorm';

interface IREUserSeeder extends Partial<Omit<IREUser, 'website' | 'roles'>> {
  websiteDomain: string;
  roleSlugs: ROLE_SLUG_ENUM[];
}

const userItems: IREUserSeeder[] = [
  {
    email: `root@${WEBSITE_DOMAIN_ENUM.ENCACAP_RE_DEV}`,
    username: `root_${WEBSITE_DOMAIN_ENUM.ENCACAP_RE_DEV.replace(/\./g, '_')}`,
    password: '123456',
    firstName: 'Khac Khanh',
    lastName: 'Nguyen',
    websiteDomain: WEBSITE_DOMAIN_ENUM.ENCACAP_RE_DEV,
    roleSlugs: [ROLE_SLUG_ENUM.ROOT, ROLE_SLUG_ENUM.ADMIN],
  },
  {
    email: `admin@${WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV}`,
    username: `admin_${WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV.replace(/\./g, '_')}`,
    password: '123456',
    firstName: 'Admin',
    lastName: 'Baoloc RE',
    websiteDomain: WEBSITE_DOMAIN_ENUM.BAOLOCRE_DEV,
    roleSlugs: [ROLE_SLUG_ENUM.ADMIN],
  },
  {
    email: `admin@${WEBSITE_DOMAIN_ENUM.ACBUILDING_DEV}`,
    username: `admin_${WEBSITE_DOMAIN_ENUM.ACBUILDING_DEV.replace(/\./g, '_')}`,
    password: '123456',
    firstName: 'Admin',
    lastName: 'AC Building',
    websiteDomain: WEBSITE_DOMAIN_ENUM.ACBUILDING_DEV,
    roleSlugs: [ROLE_SLUG_ENUM.ADMIN],
  },
];

@Injectable()
export class UserSeeder implements Seeder {
  private roleItems: RoleEntity[] = [];
  private websiteItems: WebsiteEntity[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleMappingEntity)
    private readonly userRoleMappingRepository: Repository<UserRoleMappingEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(WebsiteEntity)
    private readonly websiteRepository: Repository<WebsiteEntity>,
    private readonly configService: AppConfigService,
  ) {}

  async upsertUserItem(item: IREUserSeeder) {
    let record = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: item.email })
      .getOne();

    const hashedPassword = await UserEntity.hashPassword(item.password || this.configService.rootPassword);
    const website = this.websiteItems.find((website) => website.url === item.websiteDomain);

    const newItem = {
      email: item.email,
      username: item.username,
      password: hashedPassword,
      firstName: item.firstName,
      lastName: item.lastName,
      websiteId: website?.id,
    };

    if (record) {
      await this.userRepository.update({ id: record.id }, newItem);
    } else {
      record = await this.userRepository.save(newItem);
    }

    const userRoleMappingItems = [];

    this.roleItems.forEach((role) => {
      if (!item.roleSlugs.includes(role.slug)) {
        return;
      }

      userRoleMappingItems.push({
        userId: record.id,
        roleId: role.id,
      });
    });

    await this.userRoleMappingRepository.delete({ userId: record.id });

    return this.userRoleMappingRepository.save(userRoleMappingItems);
  }

  async seed() {
    this.roleItems = await this.roleRepository.find();
    this.websiteItems = await this.websiteRepository.find();

    const seedTasks = userItems.map((item) => this.upsertUserItem(item));

    return Promise.all(seedTasks);
  }

  drop() {
    return Promise.all([this.userRepository.delete({}), this.userRoleMappingRepository.delete({})]);
  }
}
