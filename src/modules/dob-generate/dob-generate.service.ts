import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DobGenerateHistory } from './dob-generate-history.entity';
import { DobFormat } from './dob-generate.dto';

@Injectable()
export class DobServices {
  constructor(
    @InjectRepository(DobGenerateHistory)
    private readonly historyRepo: Repository<DobGenerateHistory>,
  ) {}

  async generateDOB(
    dob_number: number,
    dob_format: DobFormat,
    min_age?: number,
    max_age?: number,
  ): Promise<string[]> {
    const generatedDOBs: string[] = [];

    for (let i = 0; i < dob_number; i++) {
      const dob = this.generateRandomDOB(dob_format, min_age, max_age);
      generatedDOBs.push(dob);
    }

    // save to history
    await this.saveHistory(
      dob_number,
      dob_format,
      generatedDOBs.map((dob) => ({ dob })),
    );

    return generatedDOBs;
  }

  private generateRandomDOB(
    format: DobFormat,
    min_age?: number,
    max_age?: number,
  ): string {
    // Default age range if not provided
    const currentYear = new Date().getFullYear();
    const defaultMinAge = min_age || 18;
    const defaultMaxAge = max_age || 75;

    // Calculate year range based on age
    const maxYear = currentYear - defaultMinAge;
    const minYear = currentYear - defaultMaxAge;

    const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const month = Math.floor(Math.random() * 12) + 1;

    // Get the number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;

    // Format based on the requested format
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    if (format === DobFormat.DDMMYYYY) {
      return `${formattedDay}/${formattedMonth}/${year}`;
    } else {
      return `${formattedMonth}/${formattedDay}/${year}`;
    }
  }

  // save dob to db
  async saveHistory(
    dob_number: number,
    dob_format: string,
    dobs: { dob: string }[],
  ) {
    const history = this.historyRepo.create({
      dob_number,
      dob_format,
      dobs: JSON.stringify(dobs),
    });
    return this.historyRepo.save(history);
  }

  // total number of generated dobs
  async getTotalGeneratedDobs() {
    const history = await this.getHistory();
    return history.reduce((total, entry) => total + entry.dob_number, 0);
  }

  // get dob generation history
  async getHistory() {
    return this.historyRepo.find();
  }

  // delete all dob generation history
  async deleteAllHistory() {
    return this.historyRepo.clear();
  }
}
