import {
  IsNumber,
  Min,
  Max,
  IsEnum,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export enum DobFormat {
  DDMMYYYY = 'dd/mm/yyyy',
  MMDDYYYY = 'mm/dd/yyyy',
}

export class DOBGenerateDto {
  @IsEnum(DobFormat)
  dob_format: DobFormat;

  @IsNumber()
  @Min(1)
  dob_number: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(120)
  min_age?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(120)
  @ValidateIf((o) => (o.min_age && o.max_age ? o.max_age >= o.min_age : true), {
    message: 'max_age must be greater than or equal to min_age',
  })
  max_age?: number;
}
