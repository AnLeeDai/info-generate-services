import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameGenerateController } from './name-generate.controller';
import { NameServices } from './name-generate.service';
import { NameGenerateHistory } from './name-generate-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NameGenerateHistory])],
  controllers: [NameGenerateController],
  providers: [NameServices],
  exports: [NameServices],
})
export class NameGenerateModule {}
