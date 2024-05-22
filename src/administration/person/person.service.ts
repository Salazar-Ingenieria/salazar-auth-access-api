import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Person } from './person.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';

import { UpdatePersonDto, WritePersonDto } from './person.dto';
import { IPersonPaginatedResponse, IPersonResponse } from './person.interfaces';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly _personRepository: Repository<Person>,
  ) {}

  public async readAllPersons(paginationDto: PaginationDto): Promise<IPersonPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._personRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
      relations: { city: true, department: true },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readPersonById(id: number): Promise<IPersonResponse> {
    const person = await this._personRepository.findOne({ where: { id }, relations: { city: true, department: true } });

    if (!person) throw new NotFoundException({ message: 'Persona no encontrada.' });

    return { data: person, message: 'Persona encontrada.' };
  }

  public async writePerson(personData: WritePersonDto): Promise<IPersonResponse> {
    const existingPerson = await this._personRepository.findOne({ where: { identification: personData.identification } });
    if (existingPerson) throw new ConflictException({ message: 'Ya existe una persona con ese número de identificación.' });

    const createPerson = this._personRepository.create(personData);
    const savePerson = await this._personRepository.save(createPerson);

    return { data: savePerson, message: 'Persona creada satisfactoriamente.' };
  }

  public async updatePerson(id: number, personData: UpdatePersonDto): Promise<IPersonResponse> {
    const person = await this._personRepository.findOne({ where: { id } });
    if (!person) throw new NotFoundException({ message: 'Persona no encontrada.' });

    if (personData.identification) {
      const existingPerson = await this._personRepository.findOne({ where: { identification: personData.identification } });

      if (existingPerson && existingPerson.id !== id) throw new ConflictException({ message: 'Ya existe una persona con ese número de identificación.' });
    }

    Object.assign(person, personData);
    const updatedPerson = await this._personRepository.save(person);

    return { data: updatedPerson, message: 'Persona actualizada satisfactoriamente.' };
  }
}
