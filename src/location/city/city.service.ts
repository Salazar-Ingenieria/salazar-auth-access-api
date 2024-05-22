import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City } from './city.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { ICityPaginatedResponse, ICityResponse } from './city.interfaces';
import { UpdateCityDto, WriteCityDto } from './city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly _cityRepository: Repository<City>,
  ) {}

  public async readAllCities(paginationDto: PaginationDto): Promise<ICityPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._cityRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
      relations: { department: true },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readCityById(id: number): Promise<ICityResponse> {
    const city = await this._cityRepository.findOne({ where: { id }, relations: { department: true } });
    if (!city) throw new NotFoundException({ message: 'Ciudad no encontrada.' });

    return { data: city, message: 'Ciudad encontrada.' };
  }

  public async writeCity(cityData: WriteCityDto): Promise<ICityResponse> {
    const existingCity = await this._cityRepository.findOne({ where: { name: cityData.name } });
    if (existingCity) throw new ConflictException({ message: 'Pruebe con un nombre de ciudad diferente.' });

    const createCity = this._cityRepository.create(cityData);
    const saveCity = await this._cityRepository.save(createCity);

    return { data: saveCity, message: 'Ciudad creada satisfactoriamente.' };
  }

  public async updateCity(id: number, cityData: UpdateCityDto): Promise<ICityResponse> {
    const city = await this._cityRepository.findOne({ where: { id } });
    if (!city) throw new NotFoundException({ message: 'Ciudad no encontrada.' });

    if (cityData.name) {
      const existingCity = await this._cityRepository.findOne({ where: { name: cityData.name } });

      if (existingCity && existingCity.id !== id) throw new ConflictException({ message: 'Pruebe con un nombre de ciudad diferente.' });
    }

    Object.assign(city, cityData);
    const updatedCity = await this._cityRepository.save(city);

    return { data: updatedCity, message: 'Ciudad actualizada satisfactoriamente.' };
  }
}
