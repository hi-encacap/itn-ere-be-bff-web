import { Exclude } from 'class-transformer';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactBodyDto extends CreateContactDto {
  @Exclude()
  id: number;
}
