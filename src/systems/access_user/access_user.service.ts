import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccessUser } from './access_user.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IAccessUserPaginatedResponse, IAccessUserResponse } from './access_user.interfaces';
import { UpdateAccessUserDto, WriteAccessUserDto } from './access_user.dto';

@Injectable()
export class AccessUserService {
  constructor(
    @InjectRepository(AccessUser)
    private readonly _accessUserRepository: Repository<AccessUser>,
  ) {}

  public async readAllAccessUsers(paginationDto: PaginationDto): Promise<IAccessUserPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._accessUserRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readAccessUserById(id: number): Promise<IAccessUserResponse> {
    const user = await this._accessUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException({ message: 'Usuario no encontrado.' });

    return { data: user, message: 'Usuario encontrado.' };
  }

  public async writeAccessUser(userData: WriteAccessUserDto): Promise<IAccessUserResponse> {
    const existingUser = await this._accessUserRepository.findOne({ where: [{ userId: userData.userId }, { menuId: userData.menuId }] });
    if (existingUser) throw new ConflictException({ message: 'El usuario o correo electrónico ya existe.' });

    const createUser = this._accessUserRepository.create(userData);
    const saveUser = await this._accessUserRepository.save(createUser);

    return { data: saveUser, message: 'Usuario creado satisfactoriamente.' };
  }

  public async updateAccessUser(id: number, userData: UpdateAccessUserDto): Promise<IAccessUserResponse> {
    const user = await this._accessUserRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException({ message: 'Usuario no encontrado.' });

    Object.assign(user, userData);
    const updatedUser = await this._accessUserRepository.save(user);

    return { data: updatedUser, message: 'Usuario actualizado satisfactoriamente.' };
  }
}
