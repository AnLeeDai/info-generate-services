import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NameGenerateHistory } from './name-generate-history.entity';

@Injectable()
export class NameServices {
  constructor(
    @InjectRepository(NameGenerateHistory)
    private readonly historyRepo: Repository<NameGenerateHistory>,
  ) {}

  // save name to db
  async saveHistory(
    name_number: number,
    name_format: string,
    names: { name: string }[],
  ) {
    const history = this.historyRepo.create({
      name_number,
      name_format,
      names: JSON.stringify(names),
    });
    return this.historyRepo.save(history);
  }

  // get name generation history
  async getHistory() {
    return this.historyRepo.find();
  }

  // delete all name generation history
  async deleteAllHistory() {
    return this.historyRepo.clear();
  }
}
