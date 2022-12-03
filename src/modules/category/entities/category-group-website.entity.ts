import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CategoryGroupEntity } from './category-group.entity';

@Entity({ name: 'category_group_websites' })
export class CategoryGroupWebsiteEntity {
  @Column({ name: 'website_id', type: 'int', primary: true })
  websiteId: number;

  @Column({ name: 'category_group_code', type: 'varchar', length: 255, primary: true })
  categoryGroupCode: string;

  @ManyToOne(() => CategoryGroupEntity)
  @JoinColumn({ name: 'category_group_code', referencedColumnName: 'code' })
  categoryGroup: CategoryGroupEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
