import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'user_permissions' })
export class UserPermissionEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'permission_code' })
  permissionCode: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => PermissionEntity)
  @JoinColumn({ name: 'permission_code', referencedColumnName: 'code' })
  permission: PermissionEntity;
}
