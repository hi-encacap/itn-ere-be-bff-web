import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_roles' })
export class UserRoleMappingEntity extends BaseEntity {
  @PrimaryColumn({ name: 'user_id' })
  @ManyToOne(() => UserEntity, (user) => user.roles)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId!: number;

  @PrimaryColumn({ name: 'role_id' })
  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roleId!: number;
}
