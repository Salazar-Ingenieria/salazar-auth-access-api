import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class WriteCityDto {
  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsInt({ message: 'The departmentId field must be an integer' })
  @IsNotEmpty({ message: 'The departmentId field is required' })
  departmentId: number;
}

export class UpdateCityDto extends PartialType(WriteCityDto) {}
