import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NameGenerateDto } from './name-generate.dto';
import { NameServices } from './name-generate.service';
import { faker } from '@faker-js/faker/locale/en';

type NameFormat = 'first_last' | 'first_middle_last';

@Controller('generate')
export class NameGenerateController {
  constructor(private readonly nameService: NameServices) {}

  @Post('name')
  async generateName(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: NameGenerateDto & { name_format: NameFormat },
  ) {
    const { name_number, name_format } = body;

    if (!name_number || name_number <= 0) {
      return { name_number, name_format, names: [] };
    }

    const seen = new Set<string>();

    while (seen.size < name_number) {
      let full = '';
      if (name_format === 'first_last') {
        full = `${faker.person.firstName()} ${faker.person.lastName()}`;
      } else {
        full = `${faker.person.firstName()} ${faker.person.firstName()} ${faker.person.lastName()}`;
      }

      // Chỉ thêm tên nếu không chứa dấu gạch ngang
      if (!full.includes('-')) {
        seen.add(full);
      }
    }

    const names = Array.from(seen).map((name) => ({ name }));

    await this.nameService.saveHistory(name_number, name_format, names);

    return { name_number, name_format, names };
  }

  @Get('name/history')
  async getNameHistory() {
    await this.nameService.getHistory();

    return {
      history: await this.nameService.getHistory(),
      message:
        'If the history is empty, it means no names have been generated yet.',
    };
  }

  @Delete('name/history/delete')
  async deleteNameHistory() {
    await this.nameService.deleteAllHistory();

    return {
      message: 'All name generation history has been deleted.',
    };
  }
}
