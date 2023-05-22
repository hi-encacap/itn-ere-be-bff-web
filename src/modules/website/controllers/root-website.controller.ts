import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootAuthGuard } from 'src/common/guards/root-auth.guard';
import { WebsiteService } from '../website.service';

@UseGuards(JwtAuthGuard, RootAuthGuard)
@Controller('root/websites')
export class RootWebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get()
  getAll() {
    return this.websiteService.getAll();
  }
}
