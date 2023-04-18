import { PartialType } from '@nestjs/swagger';
import { EstateCreateBodyDto } from './estate-create-body.dto';

export class EstateDraftCreateBodyDto extends PartialType(EstateCreateBodyDto) {}
