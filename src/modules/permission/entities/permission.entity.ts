import { BaseEntityWithPrimaryCodeColumn } from '@bases/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserPermissionEntity } from './user-permission.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => UserPermissionEntity, (userPermission) => userPermission.permission)
  userPermissions!: UserPermissionEntity[];
}
