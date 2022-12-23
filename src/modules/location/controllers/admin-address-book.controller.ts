import { Controller, Delete, Get, Param, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { AddressBookDeleteParamDto } from '../dtos/address-book-delete-param.dto';
import { AddressBookListQueryDto } from '../dtos/address-book-list-query.dto';
import { AddressBookService } from '../services/address-book.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/locations/address-books')
export class AdminAddressBookController {
  constructor(private readonly addressBookService: AddressBookService) {}

  @Get()
  index(@Query() query: AddressBookListQueryDto, @User() user: IUser) {
    return this.addressBookService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Delete(':id')
  delete(@Param() { id }: AddressBookDeleteParamDto) {
    return this.addressBookService.delete(id);
  }
}
