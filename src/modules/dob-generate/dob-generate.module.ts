import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DobGenerateController } from './dob-generate.controller';
import { DobServices } from './dob-generate.service';
import { DobGenerateHistory } from './dob-generate-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DobGenerateHistory])],
  controllers: [DobGenerateController],
  providers: [DobServices],
  exports: [DobServices],
})
export class DobGenerateModule {}
