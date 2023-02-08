import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { TOKEN_TYPE_ENUM } from '../constants/token.constant';

@Entity('tokens')
export class TokenEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column()
  token: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ enum: TOKEN_TYPE_ENUM })
  type: TOKEN_TYPE_ENUM;

  @Column({ name: 'expires_at', nullable: true })
  expiresAt: Date;
}
