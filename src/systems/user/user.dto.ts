import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class WriteUserDto {
  @IsInt({ message: 'The personId field must be an integer' })
  @IsOptional()
  personId: number;

  @IsInt({ message: 'The rolId field must be an integer' })
  @IsNotEmpty({ message: 'The rolId field is required' })
  rolId: number;

  @IsEmail({}, { message: 'The email field must be a valid email' })
  @IsNotEmpty({ message: 'The email field is required' })
  email: string;

  @IsString({ message: 'The password field must be a string' })
  @MinLength(8, {
    message: 'The password field must have at least 8 characters',
  })
  @IsNotEmpty({ message: 'The password field is required' })
  password: string;
}

export class UpdateUserDto extends PartialType(WriteUserDto) {}
