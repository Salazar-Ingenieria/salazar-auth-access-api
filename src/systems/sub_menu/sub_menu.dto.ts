import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class WriteSubMenuDto {
  @IsInt({ message: 'The menuId field must be an integer' })
  @IsNotEmpty({ message: 'The menuId field is required' })
  menuId: number;

  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsString({ message: 'The route field must be a string' })
  @IsNotEmpty({ message: 'The route field is required' })
  route: string;

  @IsString({ message: 'The route_front field must be a string' })
  @IsNotEmpty({ message: 'The route_front field is required' })
  route_front: string;

  @IsString({ message: 'The icon field must be a string' })
  @IsNotEmpty({ message: 'The icon field is required' })
  icon: string;

  @IsInt({ message: 'The position field must be an integer' })
  @IsNotEmpty({ message: 'The position field is required' })
  position: number;
}

export class UpdateSubMenuDto extends PartialType(WriteSubMenuDto) {}
