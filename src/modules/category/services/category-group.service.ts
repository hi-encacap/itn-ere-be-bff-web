import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryGroupEntity } from '../entities/category-group.entity';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectRepository(CategoryGroupEntity)
    private readonly categoryGroupRepository: Repository<CategoryGroupEntity>,
  ) {}

  getGroups() {
    return this.categoryGroupRepository
      .createQueryBuilder('category_group')
      .leftJoinAndSelect('category_group.user', 'user')
      .getMany();
  }
}
