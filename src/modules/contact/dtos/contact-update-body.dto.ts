import { Exclude } from 'class-transformer';
import { ContactCreateBodyDto } from './contact-create-body.dto';

export class ContactUpdateBodyDto extends ContactCreateBodyDto {
  @Exclude()
  id: number;
}
