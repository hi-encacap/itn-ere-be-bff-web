import { Controller, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('admin/configs')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class AdminConfigController {}
