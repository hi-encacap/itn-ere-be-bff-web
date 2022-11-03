import { compare, hash } from 'bcrypt';
import { IWebsite } from 'src/modules/website/constants/website.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IRole, IUser } from '../interfaces/user.interface';
import { UserRoleMappingEntity } from './user-role-mapping.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

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
