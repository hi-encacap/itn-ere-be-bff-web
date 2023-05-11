import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BaseIdParamDto } from 'src/base/base.dto';
import { AddUserIdToParam } from 'src/common/decorators/add-user-id-to-param.decorator';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ContactCreateBodyDto } from '../dtos/contact-create-body.dto';
import { ContactDeleteParamDto } from '../dtos/contact-delete-param.dto';
import { ContactListQueryDto } from '../dtos/contact-list-query.dto';
import { ContactUpdateBodyDto } from '../dtos/contact-update-body.dto';
import { ContactUpdateParamDto } from '../dtos/contact-update-param.dto';
import { ContactService } from '../services/contact.service';

@Controller('admin/contacts')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class AdminContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll(@Req() { user }, @Query() query: ContactListQueryDto) {
    return this.contactService.getAll({ ...query, websiteId: user.website.id });
  }

  @Get(':id')
  findOne(@AddUserIdToParam() @Param() { id }: BaseIdParamDto) {
    return this.contactService.get({
      id,
    });
  }

  @Post()
  create(@Body() createContactDto: ContactCreateBodyDto, @Req() { user }) {
    return this.contactService.create(createContactDto, user);
  }

  @Put(':id')
  update(
    @AddUserIdToParam() @Param() { id }: ContactUpdateParamDto,
    @Body() updateContactDto: ContactUpdateBodyDto,
  ) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  delete(@AddUserIdToParam() @Param() { id }: ContactDeleteParamDto) {
    return this.contactService.delete(id);
  }
}
