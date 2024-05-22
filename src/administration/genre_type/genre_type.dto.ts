import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class WriteGenreTypeDto {
  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsString({ message: 'The description field must be a string' })
  @IsOptional({ message: 'The description field is optional' })
  description?: string;
}

export class UpdateGenreTypeDto extends PartialType(WriteGenreTypeDto) {}
