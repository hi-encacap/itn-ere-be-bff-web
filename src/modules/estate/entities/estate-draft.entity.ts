import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('estate_drafts')
export class EstateDraftEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column({ type: 'jsonb' })
  data: string;

  @Column({ name: 'website_id' })
  websiteId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
