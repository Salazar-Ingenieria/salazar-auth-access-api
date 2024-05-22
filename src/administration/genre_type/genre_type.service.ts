import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenreType } from './genre_type.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IGenreTypePaginatedResponse, IGenreTypeResponse } from './genre_type.interfaces';
import { UpdateGenreTypeDto, WriteGenreTypeDto } from './genre_type.dto';

@Injectable()
export class GenreTypeService {
  constructor(
    @InjectRepository(GenreType)
    private readonly _genreTypeRepository: Repository<GenreType>,
  ) {}

  public async readAllGenreTypes(paginationDto: PaginationDto): Promise<IGenreTypePaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._genreTypeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readGenreTypeById(id: number): Promise<IGenreTypeResponse> {
    const genre = await this._genreTypeRepository.findOne({ where: { id } });
    if (!genre) throw new NotFoundException({ message: 'Género no encontrado.' });

    return { data: genre, message: 'Género encontrado.' };
  }

  public async writeGenreType(genreTypeData: WriteGenreTypeDto): Promise<IGenreTypeResponse> {
    const existingGenre = await this._genreTypeRepository.findOne({ where: { name: genreTypeData.name } });
    if (existingGenre) throw new ConflictException({ message: 'Pruebe con un nombre de género diferente.' });

    const createGenre = this._genreTypeRepository.create(genreTypeData);
    const saveGenre = await this._genreTypeRepository.save(createGenre);

    return { data: saveGenre, message: 'Género creado satisfactoriamente.' };
  }

  public async updateGenreType(id: number, genreTypeData: UpdateGenreTypeDto): Promise<IGenreTypeResponse> {
    const genre = await this._genreTypeRepository.findOne({ where: { id } });
    if (!genre) throw new NotFoundException({ message: 'Género no encontrado.' });

    if (genreTypeData.name) {
      const existingGenre = await this._genreTypeRepository.findOne({ where: { name: genreTypeData.name } });

      if (existingGenre && existingGenre.id !== id) throw new ConflictException({ message: 'Pruebe con un nombre de género diferente.' });
    }

    Object.assign(genre, genreTypeData);
    const updatedGenre = await this._genreTypeRepository.save(genre);

    return { data: updatedGenre, message: 'Género actualizado satisfactoriamente.' };
  }
}
