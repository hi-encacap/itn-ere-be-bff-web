import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactEntity } from '../entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity) private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  create(createContactDto: CreateContactDto, user?: IUser) {
    return this.contactRepository.save({
      ...createContactDto,
      website: user.website,
    });
  }

  findAll(query: FindOptionsWhere<ContactEntity>) {
    const queryBuilder = this.getQueryBuilder().where(query);

    return queryBuilder.getMany();
  }

  findOne(query: FindOptionsWhere<ContactEntity>) {
    return this.getQueryBuilder().where(query).getOne();
  }

  private getQueryBuilder() {
    return this.contactRepository
      .createQueryBuilder('contact')
      .leftJoinAndSelect('contact.website', 'website')
      .orderBy('contact.id', 'DESC');
  }
}
