import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'encacap/dist/re';
import { Repository } from 'typeorm';
import { EstateCreateBodyDto } from '../dtos/estate-create-body.dto';
import { EstateEntity } from '../entities/estate.entity';

@Injectable()
export class EstateService {
  constructor(@InjectRepository(EstateEntity) private readonly estateRepository: Repository<EstateEntity>) {}

  create(body: EstateCreateBodyDto, user?: IUser) {
    return body;
  }
}
