import { IsInt, IsIn, Min, Max } from 'class-validator';

export class NameGenerateDto {
  @IsInt({ message: 'name_number must be an integer' })
  @Min(1, { message: 'name_number must be greater than 0' })
  @Max(100, { message: 'name_number must be less than or equal to 100' })
  name_number: number;

  @IsIn(['first_last', 'first_middle_last'], {
    message: 'name_format must be first_last or first_middle_last',
  })
  name_format: 'first_last' | 'first_middle_last';
}
