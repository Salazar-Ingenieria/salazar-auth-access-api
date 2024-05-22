import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class WriteMenuDto {
  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsString({ message: 'The route_back field must be a string' })
  @IsNotEmpty({ message: 'The route_back field is required' })
  route_back: string;

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

export class UpdateMenuDto extends PartialType(WriteMenuDto) {}
