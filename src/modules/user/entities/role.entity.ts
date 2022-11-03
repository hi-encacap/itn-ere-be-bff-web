import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IRole } from '../interfaces/user.interface';
import { UserRoleMappingEntity } from './user-role-mapping.entity';

@Entity({ name: 'roles' })
export class RoleEntity implements IRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  slug!: string;

  @OneToMany(() => UserRoleMappingEntity, (userRoleMapping) => userRoleMapping.roleId)
  users!: UserRoleMappingEntity[];
}
