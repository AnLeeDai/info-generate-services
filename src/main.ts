/* eslint-disable @typescript-eslint/no-unsafe-return */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformInterceptor } from './common/response-transform.interceptor';

import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  await app.listen(process.env.PORT ?? 3000);

  // Log entity metadata và bảng hiện có (chuẩn TypeORM v0.3+)
  try {
    const dataSource = app.get<DataSource>(getDataSourceToken());
    console.log(
      'TypeORM entities:',
      dataSource.entityMetadatas.map((e) => e.name),
    );
    const tables = await dataSource.query(
      `SELECT name FROM sqlite_master WHERE type='table'`,
    );
    console.log(
      'Tables in DB:',
      tables.map((t: any) => t.name),
    );
  } catch (err) {
    console.error('TypeORM log error:', err);
  }
}
void bootstrap();
