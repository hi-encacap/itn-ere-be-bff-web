import { Controller } from '@nestjs/common';
import { IUser } from 'encacap/dist/re';
import { User } from 'src/common/decorators/user.decorator';
import { EstateCreateBodyDto } from '../dtos/estate-create-body.dto';
import { EstateService } from '../services/estate.service';

@Controller('estates')
export class EstateController {
  constructor(private readonly estateService: EstateService) {}

  create(body: EstateCreateBodyDto, @User() user: IUser) {
    return this.estateService.create(body, user);
  }
}
