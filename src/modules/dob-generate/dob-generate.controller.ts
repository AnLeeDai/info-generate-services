import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { DobServices } from './dob-generate.service';
import { DOBGenerateDto } from './dob-generate.dto';

@Controller('generate')
export class DobGenerateController {
  constructor(private readonly dobService: DobServices) {}

  @Post('dob')
  async generateDOB(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dobGenerateDto: DOBGenerateDto,
  ) {
    const { dob_number, dob_format, min_age, max_age } = dobGenerateDto;

    const generatedDOBs = await this.dobService.generateDOB(
      dob_number,
      dob_format,
      min_age,
      max_age,
    );

    return {
      success: true,
      data: {
        dob_format,
        dob_number,
        min_age: min_age || 18,
        max_age: max_age || 75,
        generated_dobs: generatedDOBs,
      },
      message: `Successfully generated ${dob_number} DOB(s) for age range ${min_age || 18}-${max_age || 75}`,
    };
  }

  @Get('dob/history')
  async getDOBHistory() {
    const history = await this.dobService.getHistory();

    const totalHistory = await this.dobService.getTotalGeneratedDobs();

    return {
      success: true,
      data: history,
      message: 'Successfully retrieved DOB generation history',
      total: totalHistory,
    };
  }

  @Delete('dob/history/delete')
  async deleteDOBHistory() {
    await this.dobService.deleteAllHistory();
    return {
      success: true,
      message: 'Successfully deleted DOB generation history',
    };
  }
}
