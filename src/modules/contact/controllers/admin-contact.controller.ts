import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AddUserIdToParam } from 'src/common/decorators/add-user-id-to-param.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ContactCreateBodyDto } from '../dto/contact-create-body.dto';
import { ContactDeleteParamDto } from '../dto/contact-delete-param.dto';
import { ContactListQueryDto } from '../dto/contact-list-query.dto';
import { ContactUpdateBodyDto } from '../dto/contact-update-body.dto';
import { ContactUpdateParamDto } from '../dto/contact-update-param.dto';
import { ContactService } from '../services/contact.service';

@Controller('admin/contacts')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll(@Req() { user }, @Query() query: ContactListQueryDto) {
    return this.contactService.findAll({ ...query, websiteId: user.website.id });
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
