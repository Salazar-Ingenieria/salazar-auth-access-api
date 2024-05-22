import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';

export class WriteAccessRolDto {
  @IsInt({ message: 'The rolId field must be an integer' })
  @IsNotEmpty({ message: 'The rolId field is required' })
  rolId: number;

  @IsInt({ message: 'The menuId field must be an integer' })
  @IsNotEmpty({ message: 'The menuId field is required' })
  menuId: number;
}

export class UpdateAccessRolDto extends PartialType(WriteAccessRolDto) {}
