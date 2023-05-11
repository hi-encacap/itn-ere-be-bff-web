import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlgoliaModule } from '../algolia/algolia.module';
import { CloudflareModule } from '../cloudflare/cloudflare.module';
import { AdminContactController } from './controllers/admin-contact.controller';
import { ContactEntity } from './entities/contact.entity';
import { ContactService } from './services/contact.service';
import { ContactExistsValidator } from './validators/contact-exists.validator';
import { ContactNotExistsValidator } from './validators/contact-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity]), CloudflareModule, AlgoliaModule],
  controllers: [AdminContactController],
  providers: [ContactService, ContactExistsValidator, ContactNotExistsValidator],
  exports: [ContactExistsValidator, ContactNotExistsValidator, ContactService],
})
export class ContactModule {}
