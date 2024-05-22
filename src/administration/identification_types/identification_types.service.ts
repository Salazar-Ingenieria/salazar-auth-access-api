import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdentificationType } from './identification_type.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IIdentificationTypePaginatedResponse, IIdentificationTypeResponse } from './identification_type.interfaces';
import { UpdateIdentificationTypeDto, WriteIdentificationTypeDto } from './identification_types.dto';

@Injectable()
export class IdentificationTypesService {
  constructor(
    @InjectRepository(IdentificationType)
    private readonly _identificationTypeRepository: Repository<IdentificationType>,
  ) {}

  public async readAllIdentificationTypes(paginationDto: PaginationDto): Promise<IIdentificationTypePaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._identificationTypeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readIdentificationTypeById(id: number): Promise<IIdentificationTypeResponse> {
    const identificationType = await this._identificationTypeRepository.findOne({ where: { id } });

    if (!identificationType) throw new NotFoundException({ message: 'Tipo de identificación no encontrado.' });

    return { data: identificationType, message: 'Tipo de identificación encontrado.' };
  }

  public async writeIdentificationType(identificationTypeData: WriteIdentificationTypeDto): Promise<IIdentificationTypeResponse> {
    const existingIdentificationType = await this._identificationTypeRepository.findOne({ where: { name: identificationTypeData.name } });

    if (existingIdentificationType) throw new ConflictException({ message: 'Pruebe con un nombre de tipo de identificación diferente.' });

    const createIdentificationType = this._identificationTypeRepository.create(identificationTypeData);
    const saveIdentificationType = await this._identificationTypeRepository.save(createIdentificationType);

    return { data: saveIdentificationType, message: 'Tipo de identificación creado satisfactoriamente.' };
  }

  public async updateIdentificationType(id: number, identificationTypeData: UpdateIdentificationTypeDto): Promise<IIdentificationTypeResponse> {
    const identificationType = await this._identificationTypeRepository.findOne({ where: { id } });

    if (!identificationType) throw new NotFoundException({ message: 'Tipo de identificación no encontrado.' });

    if (identificationTypeData.name) {
      const existingIdentificationType = await this._identificationTypeRepository.findOne({ where: { name: identificationTypeData.name } });

      if (existingIdentificationType && existingIdentificationType.id !== id) throw new ConflictException({ message: 'Pruebe con un nombre de tipo de identificación diferente.' });
    }

    Object.assign(identificationType, identificationTypeData);
    const updatedIdentificationType = await this._identificationTypeRepository.save(identificationType);

    return { data: updatedIdentificationType, message: 'Tipo de identificación actualizado satisfactoriamente.' };
  }
}
