import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import sqliteConfig from './sqlite.config';

@Module({
  imports: [TypeOrmModule.forRoot(sqliteConfig)],
})
export class DatabaseModule {}
