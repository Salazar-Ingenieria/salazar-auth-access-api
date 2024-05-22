import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { CityService } from './city.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { ICityPaginatedResponse, ICityResponse } from './city.interfaces';
import { UpdateCityDto, WriteCityDto } from './city.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../../systems/systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('cities')
export class CityController {
  constructor(private readonly _cityService: CityService) {}

  @Get()
  public async readAllCities(@Query() paginationDto: PaginationDto): Promise<ICityPaginatedResponse> {
    return await this._cityService.readAllCities(paginationDto);
  }

  @Get(':id')
  public async readCityById(@Param('id', ParseIntPipe) id: number): Promise<ICityResponse> {
    return await this._cityService.readCityById(id);
  }

  @Post()
  public async writeCity(@Body() cityData: WriteCityDto): Promise<ICityResponse> {
    return await this._cityService.writeCity(cityData);
  }

  @Patch(':id')
  public async updateCity(@Param('id', ParseIntPipe) id: number, @Body() cityData: UpdateCityDto): Promise<ICityResponse> {
    return await this._cityService.updateCity(id, cityData);
  }
}
