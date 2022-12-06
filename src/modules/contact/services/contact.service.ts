import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { CreateContactDto } from '../dto/create-contact.dto';
import { QueryContactListDto } from '../dto/query-contact-list.dto';
import { ContactEntity } from '../entities/contact.entity';

@Injectable()
export class ContactService extends BaseService {
  constructor(
    @InjectRepository(ContactEntity) private readonly contactRepository: Repository<ContactEntity>,
    private readonly cloudflareImageService: CloudflareImageService,
  ) {
    super();
  }

  create(createContactDto: CreateContactDto, user?: IUser) {
    const newContact: DeepPartial<ContactEntity> = {
      ...createContactDto,
      userId: user?.id,
    };

    return this.contactRepository.save(newContact);
  }

  update(id: number, updateContactDto: CreateContactDto) {
    return this.contactRepository.update(id, updateContactDto);
  }

  async findAll(query: FindOptionsWhere<QueryContactListDto>) {
    const queryBuilder = this.getQueryBuilder();

    if (query.websiteId) {
      queryBuilder.andWhere('website.id = :websiteId', { websiteId: query.websiteId });
    }

    const [contacts, total] = await queryBuilder.getManyAndCount();

    this.cloudflareImageService.mapVariantToImage(contacts, 'avatar');

    return this.generateGetAllResponse(contacts, total, query);
  }

  findOne(query: FindOptionsWhere<ContactEntity>) {
    return this.getQueryBuilder().where(query).getOne();
  }

  private getQueryBuilder() {
    return this.contactRepository
      .createQueryBuilder('contact')
      .leftJoin(UserEntity, 'user', 'user.id = contact.userId')
      .leftJoinAndMapOne('contact.website', WebsiteEntity, 'website', 'website.id = user.websiteId')
      .leftJoinAndMapOne('contact.avatar', CloudflareImageEntity, 'avatar', 'avatar.id = contact.avatarId')
      .leftJoinAndMapMany('avatar.variants', CloudflareVariantEntity, 'variant', 'variant.isDefault IS TRUE')
      .orderBy('contact.id', 'DESC');
  }
}
