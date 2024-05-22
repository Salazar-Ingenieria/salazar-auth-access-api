import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class WritePersonDto {
  @IsString({ message: 'The firstName field must be a string' })
  @IsNotEmpty({ message: 'The firstName field is required' })
  firstName: string;

  @IsString({ message: 'The middleName field must be a string' })
  @IsOptional({ message: 'The middleName field is optional' })
  middleName?: string;

  @IsString({ message: 'The firstSurname field must be a string' })
  @IsNotEmpty({ message: 'The firstSurname field is required' })
  firstSurname: string;

  @IsString({ message: 'The secondSurname field must be a string' })
  @IsOptional({ message: 'The secondSurname field is optional' })
  secondSurname?: string;

  @IsString({ message: 'The fullName field must be a string' })
  @IsNotEmpty({ message: 'The fullName field is required' })
  fullName: string;

  @IsInt({ message: 'The genreTypeId field must be an integer' })
  @IsNotEmpty({ message: 'The genreTypeId field is required' })
  genreTypeId: number;

  @IsInt({ message: 'The identificationTypeId field must be an integer' })
  @IsNotEmpty({ message: 'The identificationTypeId field is required' })
  identificationTypeId: number;

  @IsString({ message: 'The identification field must be a string' })
  @IsNotEmpty({ message: 'The identification field is required' })
  identification: string;

  @IsString({ message: 'The avatar field must be a string' })
  @IsOptional({ message: 'The avatar field is optional' })
  avatar?: string;

  @IsString({ message: 'The phone field must be a string' })
  @IsNotEmpty({ message: 'The phone field is required' })
  phone: string;

  @IsInt({ message: 'The departmentId field must be an integer' })
  @IsNotEmpty({ message: 'The departmentId field is required' })
  departmentId: number;

  @IsInt({ message: 'The cityId field must be an integer' })
  @IsNotEmpty({ message: 'The cityId field is required' })
  cityId: number;

  @IsString({ message: 'The address field must be a string' })
  @IsNotEmpty({ message: 'The address field is required' })
  address: string;
}

export class UpdatePersonDto extends PartialType(WritePersonDto) {}
