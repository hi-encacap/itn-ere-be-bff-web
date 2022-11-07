import { BaseEntityWithGeneratedId } from 'src/Base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IRole } from '../interfaces/user.interface';
import { UserRoleMappingEntity } from './user-role-mapping.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntityWithGeneratedId implements IRole {
  @Column()
  name!: string;

  @Column()
  slug!: string;

  @OneToMany(() => UserRoleMappingEntity, (userRoleMapping) => userRoleMapping.roleId)
  users!: UserRoleMappingEntity[];
}
