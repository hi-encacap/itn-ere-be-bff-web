import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactService } from '../services/contact.service';

@Controller('admin/contacts')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll(@Req() { user }) {
    return this.contactService.findAll({ websiteId: user.website.id });
  }

  @Post()
  create(@Body() createContactDto: CreateContactDto, @Req() { user }) {
    return this.contactService.create(createContactDto, user);
  }
}
