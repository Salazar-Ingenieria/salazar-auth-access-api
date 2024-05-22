import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IUserPaginatedResponse, IUserResponse } from './user.interfaces';
import { UpdateUserDto, WriteUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  public async readAllUsers(paginationDto: PaginationDto): Promise<IUserPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
      relations: { person: true },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readUserById(id: number): Promise<IUserResponse> {
    const user = await this._userRepository.findOne({ where: { id }, relations: { person: true } });
    if (!user) throw new NotFoundException({ message: 'Usuario no encontrado.' });

    return { data: user, message: 'Usuario encontrado.' };
  }

  public async writeUser(userData: WriteUserDto): Promise<IUserResponse> {
    const existingUser = await this._userRepository.findOne({ where: [{ email: userData.email }] });
    if (existingUser) throw new ConflictException({ message: 'El usuario o el correo electrónico ya existen.' });

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const createUser = this._userRepository.create({ ...userData, password: hashedPassword });
    const saveUser = await this._userRepository.save(createUser);

    return { data: saveUser, message: 'Usuario creado satisfactoriamente.' };
  }

  public async updateUser(id: number, userData: UpdateUserDto): Promise<IUserResponse> {
    const user = await this._userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException({ message: 'Usuario no encontrado.' });

    if (userData.password) userData.password = await bcrypt.hash(userData.password, 10);

    Object.assign(user, userData);
    const updatedUser = await this._userRepository.save(user);

    return { data: updatedUser, message: 'Usuario actualizado satisfactoriamente.' };
  }
}
