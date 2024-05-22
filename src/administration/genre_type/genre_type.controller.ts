import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GenreTypeService } from './genre_type.service';

import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IGenreTypePaginatedResponse, IGenreTypeResponse } from './genre_type.interfaces';
import { UpdateGenreTypeDto, WriteGenreTypeDto } from './genre_type.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../../systems/systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('genre-type')
export class GenreTypeController {
  constructor(private readonly _genreTypeService: GenreTypeService) {}

  @Get()
  public async readAllGenreTypes(@Query() paginationDto: PaginationDto): Promise<IGenreTypePaginatedResponse> {
    return await this._genreTypeService.readAllGenreTypes(paginationDto);
  }

  @Get(':id')
  public async readGenreTypeById(@Param('id', ParseIntPipe) id: number): Promise<IGenreTypeResponse> {
    return await this._genreTypeService.readGenreTypeById(id);
  }

  @Post()
  public async writeGenreType(@Body() genreTypeData: WriteGenreTypeDto): Promise<IGenreTypeResponse> {
    return await this._genreTypeService.writeGenreType(genreTypeData);
  }

  @Patch(':id')
  public async updateGenreType(@Param('id', ParseIntPipe) id: number, @Body() genreTypeData: UpdateGenreTypeDto): Promise<IGenreTypeResponse> {
    return await this._genreTypeService.updateGenreType(id, genreTypeData);
  }
}
