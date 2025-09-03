/* eslint-disable @typescript-eslint/no-unsafe-return */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformInterceptor } from './common/response-transform.interceptor';

import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  // Enable CORS for production
  app.enableCors();

  // Get port from environment variable (Render uses PORT)
  const port = process.env.PORT || 3000;

  // Bind to 0.0.0.0 as required by Render
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: http://0.0.0.0:${port}`);

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
