import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../systems/user/user.entity';

import { TokenService } from './token/token.service';

import { AuthenticationForgotPasswordDto, AuthenticationResetPasswordDto, AuthenticationSignInDto, AuthenticationSignUpDto } from './authentication.dto';

import { Authentication } from './authentication.interface';
import { Person } from '../administration/person/person.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,

    @InjectRepository(Person)
    private readonly _personRepository: Repository<Person>,

    private readonly _tokenService: TokenService,
  ) {}

  public async findOneByEmail(userEmail: string): Promise<User | null> {
    return this._userRepository.findOne({ where: { email: userEmail }, relations: { person: true } });
  }

  public async textHash(key: string, salt: number): Promise<string> {
    const hashText = await bcrypt.hash(key, salt);
    return hashText;
  }

  public async generateRandomText(): Promise<string> {
    return Math.random().toString(36).slice(-8);
  }

  public async continueWithTheProvider(dto: AuthenticationSignUpDto): Promise<User> {
    const existingPerson = await this._personRepository.findOne({ where: { identification: dto.person.identification } });
    if (existingPerson) throw new ConflictException('Pruebe con un número de identificación diferente.');

    const person = this._personRepository.create({
      firstName: dto.person.firstName,
      middleName: dto.person.middleName,
      firstSurname: dto.person.firstSurname,
      secondSurname: dto.person.secondSurname,
      fullName: dto.person.fullName,
      genreTypeId: dto.person.genreTypeId,
      identificationTypeId: dto.person.identificationTypeId,
      identification: dto.person.identification,
      avatar: dto.person.avatar,
      phone: dto.person.phone,
      departmentId: dto.person.departmentId,
      cityId: dto.person.cityId,
      address: dto.person.address,
    });

    const savedPerson = await this._personRepository.save(person);

    const user = this._userRepository.create({
      personId: savedPerson.id,
      rolId: 1,
      email: dto.user.email,
      password: dto.user.password,
      isActive: true,
    });

    return await this._userRepository.save(user);
  }

  public async signIn(body: AuthenticationSignInDto): Promise<Authentication.SignInResponse> {
    const user = await this.findOneByEmail(body.email);
    if (!user) throw new UnauthorizedException('correo electrónico invalido.');

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    if (!user.isActive) throw new UnauthorizedException('Tu cuenta se encuentra inactiva. Comunícate con el administrador.');

    return this._tokenService.generateAccessAndRefreshTokens(user);
  }

  public async signUp(body: AuthenticationSignUpDto): Promise<Authentication.SignUpResponse> {
    const existingUser = await this.findOneByEmail(body.user.email);
    if (existingUser) throw new ConflictException('Pruebe con un correo electrónico diferente.');

    const existingPerson = await this._personRepository.findOne({ where: { identification: body.person.identification } });
    if (existingPerson) throw new ConflictException('Pruebe con un número de identificación diferente.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.user.password, salt);

    const person = this._personRepository.create({
      firstName: body.person.firstName,
      middleName: body.person.middleName,
      firstSurname: body.person.firstSurname,
      secondSurname: body.person.secondSurname,
      fullName: body.person.fullName,
      genreTypeId: body.person.genreTypeId,
      identificationTypeId: body.person.identificationTypeId,
      identification: body.person.identification,
      avatar: body.person.avatar,
      phone: body.person.phone,
      departmentId: body.person.departmentId,
      cityId: body.person.cityId,
      address: body.person.address,
    });

    const savedPerson = await this._personRepository.save(person);

    const user = this._userRepository.create({
      personId: savedPerson.id,
      rolId: body.user.rolId,
      email: body.user.email,
      password: hashedPassword,
      isActive: true,
    });

    const savedUser = await this._userRepository.save(user);

    const completeUser = await this._userRepository.findOne({
      where: { id: savedUser.id },
      relations: { person: true, rol: true },
    });

    if (!completeUser) throw new UnauthorizedException('No fue posible recuperar el usuario creado.');

    return { id: completeUser.id, name: completeUser.person.fullName, email: completeUser.email, status: completeUser.isActive };
  }

  public async forgotPassword(body: AuthenticationForgotPasswordDto) {
    const user = await this.findOneByEmail(body.email);
    if (!user) throw new UnauthorizedException('correo electrónico invalido.');

    const resetToken = await this._tokenService.generateResetToken(user.id);

    const plainPassword = await this.generateRandomText();
    const newPassword = await this.textHash(plainPassword, 12);

    user.password = newPassword;
    await this._userRepository.save(user);

    const checkLink = `https://tusitio.com/reset-password?token=${resetToken}`;

    /*  this._emailerService.sendPasswordResetEmail({ email: user.email, name: user.name }, plainPassword, checkLink); */
  }

  public async resetPassword(body: AuthenticationResetPasswordDto) {
    const userId = await this._tokenService.validateResetToken(body.token);

    const user = await this._userRepository.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado.');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.newPassword, salt);

    await this._userRepository.save(user);
    return { message: 'Contraseña actualizada correctamente.' };
  }
}
