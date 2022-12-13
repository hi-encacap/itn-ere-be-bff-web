import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { DeepPartial, Repository } from 'typeorm';
import { AddressBookListQueryDto } from '../dto/address-book-list-query.dto';
import { AddressBookEntity } from '../entities/address-book.entity';
import { DistrictEntity } from '../entities/district.entity';
import { ProvinceEntity } from '../entities/province.entity';
import { WardEntity } from '../entities/ward.entity';

@Injectable()
export class AddressBookService extends BaseService {
  constructor(
    @InjectRepository(AddressBookEntity)
    private readonly addressBookRepository: Repository<AddressBookEntity>,
  ) {
    super();
  }

  getAll(query: AddressBookListQueryDto) {
    const queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder.andWhere('addressBook.websiteId = :websiteId', { websiteId: query.websiteId });
    }

    return this.getManyAndCount(queryBuilder, query);
  }

  create(body: DeepPartial<AddressBookEntity>) {
    return this.addressBookRepository.save(body);
  }

  delete(id: number) {
    return this.addressBookRepository.delete(id);
  }

  private get queryBuilder() {
    return this.addressBookRepository
      .createQueryBuilder('addressBook')
      .leftJoinAndMapOne(
        'addressBook.province',
        ProvinceEntity,
        'province',
        'province.code = addressBook.provinceCode',
      )
      .leftJoinAndMapOne(
        'addressBook.district',
        DistrictEntity,
        'district',
        'district.code = addressBook.districtCode',
      )
      .leftJoinAndMapOne('addressBook.ward', WardEntity, 'ward', 'ward.code = addressBook.wardCode')
      .leftJoinAndSelect('addressBook.website', 'website');
  }
}
