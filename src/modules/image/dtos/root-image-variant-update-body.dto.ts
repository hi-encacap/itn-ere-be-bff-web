import { PartialType } from '@nestjs/swagger';
import { RootImageVariantCreateBodyDto } from './root-image-variant-create-body.dto';

export class RootImageVariantUpdateBodyDto extends PartialType(RootImageVariantCreateBodyDto) {}
