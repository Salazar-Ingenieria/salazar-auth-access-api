import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { CountryService } from './country.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { ICountryPaginatedResponse, ICountryResponse } from './country.interfaces';
import { UpdateCountryDto, WriteCountryDto } from './country.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../../systems/systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('countries')
export class CountryController {
  constructor(private readonly _countryService: CountryService) {}

  @Get()
  public async readAllCountries(@Query() paginationDto: PaginationDto): Promise<ICountryPaginatedResponse> {
    return await this._countryService.readAllCountries(paginationDto);
  }

  @Get(':id')
  public async readCountryById(@Param('id', ParseIntPipe) id: number): Promise<ICountryResponse> {
    return await this._countryService.readCountryById(id);
  }

  @Post()
  public async writeCountry(@Body() countryData: WriteCountryDto): Promise<ICountryResponse> {
    return await this._countryService.writeCountry(countryData);
  }

  @Patch(':id')
  public async updateCountry(@Param('id', ParseIntPipe) id: number, @Body() countryData: UpdateCountryDto): Promise<ICountryResponse> {
    return await this._countryService.updateCountry(id, countryData);
  }
}
