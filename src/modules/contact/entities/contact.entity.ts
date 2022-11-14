import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
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

  @ManyToOne(() => WebsiteEntity, (website) => website.contacts)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website!: WebsiteEntity;
}
