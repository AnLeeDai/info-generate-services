import { NameGenerateHistory } from '../modules/name-generate/name-generate-history.entity';
import { DobGenerateHistory } from '../modules/dob-generate/dob-generate-history.entity';
import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const sqliteConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: join(__dirname, '../../data/database.sqlite'),
  entities: [NameGenerateHistory, DobGenerateHistory],
  synchronize: true,
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log'],
};

export default sqliteConfig;
