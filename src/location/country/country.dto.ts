import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class WriteCountryDto {
  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;
}

export class UpdateCountryDto extends PartialType(WriteCountryDto) {}
