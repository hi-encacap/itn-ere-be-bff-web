import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IContact } from '../interfaces/contact.interface';

@Entity({ name: 'contacts' })
export class ContactEntity extends BaseEntityWithPrimaryGeneratedColumn implements IContact {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  zalo: string;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'avatar_id' })
  avatarId!: string;

  @ManyToOne(() => UserEntity, (user) => user.contacts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => CloudflareImageEntity)
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar: CloudflareImageEntity;

  website!: WebsiteEntity;
}
