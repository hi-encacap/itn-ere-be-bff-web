import { IRole } from '@encacap-group/common/dist/account';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { ROLE_SLUG_ENUM } from 'src/common/constants/role.constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoleMappingEntity } from './user-role-mapping.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntityWithPrimaryGeneratedColumn implements IRole {
  @Column()
  name!: string;

  @Column()
  slug!: ROLE_SLUG_ENUM;

  @OneToMany(() => UserRoleMappingEntity, (userRoleMapping) => userRoleMapping.roleId)
  users!: UserRoleMappingEntity[];
}
