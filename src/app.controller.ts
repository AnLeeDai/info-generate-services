import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('data/all')
  async getAllData() {
    const allData = await this.appService.getAllData();
    const summary = await this.appService.getDatabaseSummary();

    return {
      data: allData,
      summary,
      message:
        'If the data is empty, it means no records have been created yet.',
    };
  }
}
