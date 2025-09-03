import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  // get all data from database
  async getAllData() {
    const entities = this.dataSource.entityMetadatas;
    const allData: Record<string, any[]> = {};

    for (const entity of entities) {
      const repository = this.dataSource.getRepository(entity.target);
      const tableName = entity.tableName;

      try {
        const data = await repository.find({
          order: { created_at: 'DESC' },
        });
        allData[tableName] = data;
      } catch {
        const data = await repository.find();
        allData[tableName] = data;
      }
    }

    return allData;
  }

  // get total records count
  async getTotalRecords() {
    const allData = await this.getAllData();
    return Object.values(allData).reduce(
      (total, records) => total + records.length,
      0,
    );
  }

  // get database summary
  async getDatabaseSummary() {
    const allData = await this.getAllData();
    const entities = this.dataSource.entityMetadatas;

    return {
      total_tables: entities.length,
      total_records: await this.getTotalRecords(),
      tables: entities.map((entity) => ({
        table_name: entity.tableName,
        entity_name: entity.name,
        record_count: allData[entity.tableName]?.length || 0,
      })),
    };
  }
}
