import { Module } from '@nestjs/common';
import { AppConfigModule } from './configs/config.module';
import { DatabaseModule } from './configs/database/database.module';
import { WebsiteModule } from './modules/website/website.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, WebsiteModule, UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
