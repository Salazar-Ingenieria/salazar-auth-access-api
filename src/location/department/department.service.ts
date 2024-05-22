import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './department.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IDepartmentPaginatedResponse, IDepartmentResponse } from './department.interfaces';
import { UpdateDepartmentDto, WriteDepartmentDto } from './department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly _departmentRepository: Repository<Department>,
  ) {}

  public async readAllDepartments(paginationDto: PaginationDto): Promise<IDepartmentPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._departmentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
      relations: { country: true },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readDepartmentById(id: number): Promise<IDepartmentResponse> {
    const department = await this._departmentRepository.findOne({ where: { id }, relations: { country: true } });
    if (!department) throw new NotFoundException({ message: 'Departamento no encontrado.' });

    return { data: department, message: 'Departamento encontrado.' };
  }

  public async writeDepartment(departmentData: WriteDepartmentDto): Promise<IDepartmentResponse> {
    const existingDepartment = await this._departmentRepository.findOne({ where: { name: departmentData.name } });

    if (existingDepartment) throw new ConflictException({ message: 'Pruebe con un nombre de departamento diferente.' });

    const createDepartment = this._departmentRepository.create(departmentData);
    const saveDepartment = await this._departmentRepository.save(createDepartment);

    return { data: saveDepartment, message: 'Departamento creado satisfactoriamente.' };
  }

  public async updateDepartment(id: number, departmentData: UpdateDepartmentDto): Promise<IDepartmentResponse> {
    const department = await this._departmentRepository.findOne({ where: { id } });
    if (!department) throw new NotFoundException({ message: 'Departamento no encontrado.' });

    if (departmentData.name) {
      const existingDepartment = await this._departmentRepository.findOne({ where: { name: departmentData.name } });

      if (existingDepartment && existingDepartment.id !== id) throw new ConflictException({ message: 'Pruebe con un nombre de departamento diferente.' });
    }

    Object.assign(department, departmentData);
    const updatedDepartment = await this._departmentRepository.save(department);

    return { data: updatedDepartment, message: 'Departamento actualizado satisfactoriamente.' };
  }
}
