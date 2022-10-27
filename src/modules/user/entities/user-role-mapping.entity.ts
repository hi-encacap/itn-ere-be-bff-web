import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'user_roles' })
export class UserRoleMappingEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId!: number;

  @PrimaryColumn({ name: 'role_id' })
  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roleId!: number;
}
