import { compare, hash } from 'bcrypt';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { CategoryGroupEntity } from 'src/modules/category/entities/category-group.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { ContactEntity } from 'src/modules/contact/entities/contact.entity';
import { IWebsite } from 'src/modules/website/constants/website.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IRole, IUser } from '../interfaces/user.interface';
import { UserRoleMappingEntity } from './user-role-mapping.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntityWithPrimaryGeneratedColumn implements IUser {
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

  @ManyToOne(() => CloudflareImageEntity, (image) => image.users)
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar?: CloudflareImageEntity;

  @OneToMany(() => UserRoleMappingEntity, (userRoleMapping) => userRoleMapping.userId, {
    cascade: ['remove', 'update'],
  })
  roles!: IRole[];

  @OneToMany(() => CloudflareImageEntity, (cloudflareImage) => cloudflareImage.user)
  cloudflareImages!: CloudflareImageEntity[];

  @OneToMany(() => ContactEntity, (contact) => contact.user)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  contacts!: ContactEntity[];

  @OneToMany(() => CategoryGroupEntity, (categoryGroup) => categoryGroup.user)
  @JoinColumn({ name: 'category_group_code', referencedColumnName: 'code' })
  categoryGroups!: CategoryGroupEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.user)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  categories!: CategoryEntity[];

  @ManyToOne(() => WebsiteEntity, (website) => website.users)
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
