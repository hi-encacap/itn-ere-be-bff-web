import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminContactController } from './controllers/admin-contact.controller';
import { ContactEntity } from './entities/contact.entity';
import { ContactService } from './services/contact.service';
import { ContactExistsValidator } from './validators/contact-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [AdminContactController],
  providers: [ContactService, ContactExistsValidator],
})
export class ContactModule {}
