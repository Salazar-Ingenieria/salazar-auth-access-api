import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Country } from './country.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { ICountryPaginatedResponse, ICountryResponse } from './country.interfaces';
import { UpdateCountryDto, WriteCountryDto } from './country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly _countryRepository: Repository<Country>,
  ) {}

  public async readAllCountries(paginationDto: PaginationDto): Promise<ICountryPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._countryRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readCountryById(id: number): Promise<ICountryResponse> {
    const country = await this._countryRepository.findOne({ where: { id } });
    if (!country) throw new NotFoundException({ message: 'País no encontrado.' });

    return { data: country, message: 'País encontrado.' };
  }

  public async writeCountry(countryData: WriteCountryDto): Promise<ICountryResponse> {
    const existingCountry = await this._countryRepository.findOne({ where: { name: countryData.name } });
    if (existingCountry) throw new ConflictException({ message: 'Pruebe con un nombre de país diferente.' });

    const createCountry = this._countryRepository.create(countryData);
    const saveCountry = await this._countryRepository.save(createCountry);

    return { data: saveCountry, message: 'País creado satisfactoriamente.' };
  }

  public async updateCountry(id: number, countryData: UpdateCountryDto): Promise<ICountryResponse> {
    const country = await this._countryRepository.findOne({ where: { id } });
    if (!country) throw new NotFoundException({ message: 'País no encontrado.' });

    if (countryData.name) {
      const existingCountry = await this._countryRepository.findOne({ where: { name: countryData.name } });

      if (existingCountry && existingCountry.id !== id) throw new ConflictException({ message: 'Pruebe con un nombre de país diferente.' });
    }

    Object.assign(country, countryData);
    const updatedCountry = await this._countryRepository.save(country);

    return { data: updatedCountry, message: 'País actualizado satisfactoriamente.' };
  }
}
