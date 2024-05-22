import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { WriteUserDto } from '../systems/user/user.dto';
import { WritePersonDto } from '../administration/person/person.dto';
import { Type } from 'class-transformer';

export class AuthenticationSignInDto {
  @IsEmail()
  @IsNotEmpty({ message: 'El campo Email es obligatorio.' })
  readonly email: string;

  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo Password es obligatorio.' })
  readonly password: string;
}

export class AuthenticationSignUpDto {
  @ValidateNested()
  @Type(() => WritePersonDto)
  person: WritePersonDto;

  @ValidateNested()
  @Type(() => WriteUserDto)
  user: WriteUserDto;
}

export class AuthenticationForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty({ message: 'El campo Email es obligatorio.' })
  readonly email: string;
}

export class AuthenticationResetPasswordDto {
  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo Token es obligatorio.' })
  readonly token: string;

  @IsString({ message: 'Debe ser un String.' })
  @IsNotEmpty({ message: 'El campo NewPassword es obligatorio.' })
  readonly newPassword: string;
}
