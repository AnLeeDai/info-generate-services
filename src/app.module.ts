import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { NameGenerateModule } from './modules/name-generate/name-generate.module';
import { DobGenerateModule } from './modules/dob-generate/dob-generate.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, NameGenerateModule, DobGenerateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
