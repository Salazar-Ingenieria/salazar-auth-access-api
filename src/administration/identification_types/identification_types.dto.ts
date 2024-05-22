import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class WriteIdentificationTypeDto {
  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsString({ message: 'The description field must be a string' })
  @IsOptional({ message: 'The description field is optional' })
  description?: string;
}

export class UpdateIdentificationTypeDto extends PartialType(WriteIdentificationTypeDto) {}
