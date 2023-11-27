import { IPermission, IRole } from '@encacap-group/common/dist/account';
import { IREUser, IWebsite } from '@encacap-group/common/dist/re';
import { compare, hash } from 'bcrypt';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { CategoryGroupEntity } from 'src/modules/category/entities/category-group.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { ImageEntity } from 'src/modules/image/entities/image.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, OneToMany, ManyToOne as OneToOne } from 'typeorm';
import { UserPermissionEntity } from '../../permission/entities/user-permission.entity';
import { UserRoleMappingEntity } from './user-role-mapping.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntityWithPrimaryGeneratedColumn implements IREUser {
  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    unique: true,
  })
  username!: string;

  @Column()
  password!: string;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ name: 'website_id' })
  websiteId!: number;

  @Column({ name: 'avatar_id', nullable: true })
  avatarId!: string;

  @OneToOne(() => ImageEntity)
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar?: ImageEntity;

  @OneToMany(() => UserRoleMappingEntity, (userRoleMapping) => userRoleMapping.userId, {
    cascade: ['remove', 'update'],
  })
  roles!: IRole[];

  @OneToMany(() => UserPermissionEntity, (userPermission) => userPermission.userId)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'code' })
  permissions!: IPermission[];

  @OneToMany(() => ContactEntity, (contact) => contact.user)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  contacts!: ContactEntity[];

  @OneToMany(() => CategoryGroupEntity, (categoryGroup) => categoryGroup.user)
  @JoinColumn({ name: 'category_group_code', referencedColumnName: 'code' })
  categoryGroups!: CategoryGroupEntity[];

  @OneToOne(() => WebsiteEntity, (website) => website.users)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website!: IWebsite;

  roleIds!: number[];

  static hashPassword(password: string) {
    return hash(password, 10);
  }

  public comparePassword(password: string) {
    const hashedPassword = this.password;
    return compare(password, hashedPassword);
  }
}
