import { IREUser } from '@encacap-group/types/dist/re';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { AlgoliaContactService } from 'src/modules/algolia/services/algolia-contact.service';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ContactCreateBodyDto } from '../dtos/contact-create-body.dto';
import { ContactListQueryDto } from '../dtos/contact-list-query.dto';
import { ContactEntity } from '../entities/contact.entity';

@Injectable()
export class ContactService extends BaseService {
  constructor(
    @InjectRepository(ContactEntity) private readonly contactRepository: Repository<ContactEntity>,
    private readonly cloudflareImageService: CloudflareImageService,
    private readonly algoliaContactService: AlgoliaContactService,
  ) {
    super();
  }

  async create(createContactDto: ContactCreateBodyDto, user?: IREUser) {
    const contact = await this.contactRepository.save({
      ...createContactDto,
      userId: user?.id,
    });

    this.algoliaContactService.save(this.extractAlgoliaBodyFromContact(contact));

    return contact;
  }

  update(id: number, updateContactDto: ContactCreateBodyDto) {
    this.algoliaContactService.update(this.extractAlgoliaBodyFromContact(updateContactDto, id));
    return this.contactRepository.update(id, updateContactDto);
  }

  async getAll(query: ContactListQueryDto) {
    let queryBuilder = this.getQueryBuilder();

    if (query.websiteId) {
      queryBuilder.andWhere('website.id = :websiteId', { websiteId: query.websiteId });
    }

    queryBuilder = this.setSorting(queryBuilder, query, 'contact');
    queryBuilder = this.setPagination(queryBuilder, query);
    queryBuilder = await this.setAlgoliaSearch(
      queryBuilder,
      query,
      this.algoliaContactService.search.bind(this.algoliaContactService),
      'contact.id',
    );

    const [contacts, total] = await queryBuilder.getManyAndCount();

    await this.cloudflareImageService.mapVariantToImage(contacts, 'avatar');

    return this.generateGetAllResponse(contacts, total, query);
  }

  get(query: FindOptionsWhere<ContactEntity>) {
    return this.getQueryBuilder().where(query).getOne();
  }

  delete(id: number) {
    this.algoliaContactService.remove(String(id));
    return this.contactRepository.delete(id);
  }

  private getQueryBuilder() {
    return this.contactRepository
      .createQueryBuilder('contact')
      .leftJoin(UserEntity, 'user', 'user.id = contact.userId')
      .leftJoinAndMapOne('contact.website', WebsiteEntity, 'website', 'website.id = user.websiteId')
      .leftJoinAndMapOne('contact.avatar', CloudflareImageEntity, 'avatar', 'avatar.id = contact.avatarId')
      .orderBy('contact.id', 'DESC');
  }

  private extractAlgoliaBodyFromContact(contact: DeepPartial<ContactEntity>, id?: number) {
    return {
      objectID: String(id) ?? contact.id.toString(),
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      zalo: contact.zalo,
    };
  }
}
