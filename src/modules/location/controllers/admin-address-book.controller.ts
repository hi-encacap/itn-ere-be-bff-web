import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { AddressBookListQueryDto } from '../dto/address-book-list-query.dto';
import { AddressBookService } from '../services/address-book.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/locations/address-books')
export class AdminAddressBookController {
  constructor(private readonly addressBookService: AddressBookService) {}

  @Get()
  async getAll(query: AddressBookListQueryDto, @User() user: IUser) {
    return this.addressBookService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }
}
