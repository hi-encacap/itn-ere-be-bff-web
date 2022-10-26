import { Module } from '@nestjs/common';
import { AppConfigModule } from './configs/config.module';
import { DatabaseModule } from './configs/database/database.module';

@Module({
  imports: [AppConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
