import { compare, hash } from 'bcrypt';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
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

  @OneToMany(() => UserRoleMappingEntity, (userRoleMapping) => userRoleMapping.userId, {
    cascade: ['remove', 'update'],
  })
  roles!: IRole[];

  @Column({ name: 'website_id' })
  websiteId!: number;

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
