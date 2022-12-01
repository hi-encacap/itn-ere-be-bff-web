import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateContactDto } from '../dto/create-contact.dto';
import { QueryContactListDto } from '../dto/query-contact-list.dto';
import { ContactEntity } from '../entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity) private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  create(createContactDto: CreateContactDto, user?: IUser) {
    return this.contactRepository.save({
      ...createContactDto,
      userId: user?.id,
    });
  }

  findAll(query: FindOptionsWhere<QueryContactListDto>) {
    const queryBuilder = this.getQueryBuilder();

    if (query.websiteId) {
      queryBuilder.andWhere('website.id = :websiteId', { websiteId: query.websiteId });
    }

    return queryBuilder.getMany();
  }

  findOne(query: FindOptionsWhere<ContactEntity>) {
    return this.getQueryBuilder().where(query).getOne();
  }

  private getQueryBuilder() {
    return this.contactRepository
      .createQueryBuilder('contact')
      .leftJoin(UserEntity, 'user', 'user.id = contact.userId')
      .leftJoinAndMapOne('contact.website', WebsiteEntity, 'website', 'website.id = user.websiteId')
      .orderBy('contact.id', 'DESC');
  }
}
