import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rol } from './rol.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IRolPaginatedResponse, IRolResponse } from './rol.interfaces';
import { UpdateRolDto, WriteRolDto } from './rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly _rolRepository: Repository<Rol>,
  ) {}

  public async readAllRols(paginationDto: PaginationDto): Promise<IRolPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._rolRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readRolById(id: number): Promise<IRolResponse> {
    const rol = await this._rolRepository.findOne({ where: { id } });
    if (!rol) throw new NotFoundException({ message: 'Rol no encontrado.' });

    return { data: rol, message: 'Rol encontrado.' };
  }

  public async writeRol(rolData: WriteRolDto): Promise<IRolResponse> {
    const existingRol = await this._rolRepository.findOne({ where: { name: rolData.name } });
    if (existingRol) throw new ConflictException({ message: 'Pruebe con un nombre de rol diferente.' });

    const createRol = this._rolRepository.create(rolData);
    const saveRol = await this._rolRepository.save(createRol);

    return { data: saveRol, message: 'Rol creado satisfactoriamente.' };
  }

  public async updateRol(id: number, rolData: UpdateRolDto): Promise<IRolResponse> {
    const rol = await this._rolRepository.findOne({ where: { id } });
    if (!rol) throw new NotFoundException({ message: 'Rol no encontrado.' });

    if (rolData.name) {
      const existingRol = await this._rolRepository.findOne({ where: { name: rolData.name } });

      if (existingRol && existingRol.id !== id) throw new ConflictException({ message: 'Pruebe con un nombre de rol diferente.' });
    }

    Object.assign(rol, rolData);
    const updatedRol = await this._rolRepository.save(rol);

    return { data: updatedRol, message: 'Rol actualizado satisfactoriamente.' };
  }
}
