import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class WriteRolDto {
  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;
}

export class UpdateRolDto extends PartialType(WriteRolDto) {}
