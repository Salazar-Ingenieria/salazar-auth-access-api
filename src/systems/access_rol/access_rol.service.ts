import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccessRol } from './access_rol.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IAccessRolPaginatedResponse, IAccessRolResponse } from './access_rol.interfaces';
import { UpdateAccessRolDto, WriteAccessRolDto } from './access_rol.dto';

@Injectable()
export class AccessRolService {
  constructor(
    @InjectRepository(AccessRol)
    private readonly _accessRolRepository: Repository<AccessRol>,
  ) {}

  public async readAllAccessRols(paginationDto: PaginationDto): Promise<IAccessRolPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._accessRolRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readAccessRolById(id: number): Promise<IAccessRolResponse> {
    const accessRol = await this._accessRolRepository.findOne({ where: { id } });
    if (!accessRol) throw new NotFoundException({ message: 'Rol no encontrado.' });

    return { data: accessRol, message: 'Rol encontrado.' };
  }

  public async writeAccessRol(accessRolData: WriteAccessRolDto): Promise<IAccessRolResponse> {
    const existingRol = await this._accessRolRepository.findOne({ where: { menuId: accessRolData.menuId } });
    if (existingRol) throw new ConflictException({ message: 'Pruebe con un nombre de rol diferente.' });

    const createRol = this._accessRolRepository.create(accessRolData);
    const saveRol = await this._accessRolRepository.save(createRol);

    return { data: saveRol, message: 'Rol creado satisfactoriamente.' };
  }

  public async updateAccessRol(id: number, accessRolData: UpdateAccessRolDto): Promise<IAccessRolResponse> {
    const accessRol = await this._accessRolRepository.findOne({ where: { id } });
    if (!accessRol) throw new NotFoundException({ message: 'Rol no encontrado.' });

    if (accessRolData.rolId) {
      const existingRol = await this._accessRolRepository.findOne({ where: { rolId: accessRolData.rolId } });
      if (existingRol && existingRol.id !== id) throw new ConflictException({ message: 'Pruebe con un nombre de rol diferente.' });
    }

    Object.assign(accessRol, accessRolData);
    const updatedRol = await this._accessRolRepository.save(accessRol);

    return { data: updatedRol, message: 'Rol actualizado satisfactoriamente.' };
  }
}
