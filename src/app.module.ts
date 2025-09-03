import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { NameGenerateModule } from './modules/name-generate/name-generate.module';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, NameGenerateModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
