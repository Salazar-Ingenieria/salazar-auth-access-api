import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class WriteDepartmentDto {
  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsInt({ message: 'The countryId field must be an integer' })
  @IsNotEmpty({ message: 'The countryId field is required' })
  countryId: number;
}

export class UpdateDepartmentDto extends PartialType(WriteDepartmentDto) {}
