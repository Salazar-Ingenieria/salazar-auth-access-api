import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';

export class WriteAccessUserDto {
  @IsInt({ message: 'The userId field must be an integer' })
  @IsNotEmpty({ message: 'The userId field is required' })
  userId: number;

  @IsInt({ message: 'The menuId field must be an integer' })
  @IsNotEmpty({ message: 'The menuId field is required' })
  menuId: number;
}

export class UpdateAccessUserDto extends PartialType(WriteAccessUserDto) {}
