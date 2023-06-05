import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AddressBookListQueryDto } from '../dtos/address-book-list-query.dto';
import { AddressBookEntity } from '../entities/address-book.entity';
import { WardService } from './ward.service';

@Injectable()
export class AddressBookService extends BaseService {
  constructor(
    @InjectRepository(AddressBookEntity)
    private readonly addressBookRepository: Repository<AddressBookEntity>,
    private readonly wardService: WardService,
  ) {
    super();
  }

  get(query: FindOptionsWhere<AddressBookEntity>) {
    return this.addressBookRepository.findOneBy(query);
  }

  getAll(query: AddressBookListQueryDto) {
    let queryBuilder = this.queryBuilder;

    queryBuilder = this.setFilterOld(queryBuilder, query, 'addressBook', 'provinceCodes', 'provinceCode');
    queryBuilder = this.setFilterOld(queryBuilder, query, 'addressBook', 'districtCodes', 'districtCode');
    queryBuilder = this.setFilterOld(queryBuilder, query, 'addressBook', 'wardCodes', 'wardCode');
    queryBuilder = this.setFilterOld(queryBuilder, query, 'addressBook', 'websiteId', 'websiteId');
    queryBuilder = this.setSorting(queryBuilder, query, 'addressBook');
    queryBuilder = this.setPagination(queryBuilder, query);

    return this.getManyAndCount(queryBuilder, query);
  }

  async create(data: AddressBookEntity) {
    const {
      code: wardCode,
      districtCode,
      district: { provinceCode },
    } = await this.wardService.get({
      code: data.wardCode,
      websiteId: data.websiteId,
    });

    const existedRecord = await this.addressBookRepository.findOneBy({
      websiteId: data.websiteId,
      provinceCode,
      districtCode,
      wardCode,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    });

    if (existedRecord) {
      return existedRecord;
    }

    return this.addressBookRepository.save({
      ...data,
      provinceCode,
      districtCode,
      wardCode,
    });
  }

  delete(id: number) {
    return this.addressBookRepository.delete(id);
  }

  private get queryBuilder() {
    return this.addressBookRepository
      .createQueryBuilder('addressBook')
      .leftJoinAndSelect('addressBook.ward', 'ward', 'addressBook.wardCode = ward.code')
      .leftJoinAndSelect('addressBook.district', 'district', 'addressBook.districtCode = district.code')
      .leftJoinAndSelect('addressBook.province', 'province', 'addressBook.provinceCode = province.code');
  }
}
