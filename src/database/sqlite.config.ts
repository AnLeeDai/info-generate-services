import { NameGenerateHistory } from '../modules/name-generate/name-generate-history.entity';
import { DobGenerateHistory } from '../modules/dob-generate/dob-generate-history.entity';
import { join, resolve } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databasePath = process.env.SQLITE_DB_PATH
  ? resolve(process.env.SQLITE_DB_PATH)
  : join(process.cwd(), 'data', 'database.sqlite');

const sqliteConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: databasePath,
  entities: [NameGenerateHistory, DobGenerateHistory],
  synchronize: true,
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log'],
};

export default sqliteConfig;
