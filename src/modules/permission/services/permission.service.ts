import { BaseService } from '@bases/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionListQueryDto } from '../dtos/permission-list-query.dto';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class PermissionService extends BaseService {
  constructor(
    @InjectRepository(PermissionEntity) private readonly permissionRepository: Repository<PermissionEntity>,
  ) {
    super();
  }

  async getAll(query: PermissionListQueryDto) {
    const queryBuilder = this.queryBuilder;

    this.setPagination(queryBuilder, query);

    const [data, total] = await queryBuilder.getManyAndCount();

    return this.generateGetAllResponse(data, total, query);
  }

  private get queryBuilder() {
    return this.permissionRepository.createQueryBuilder('permission');
  }
}
