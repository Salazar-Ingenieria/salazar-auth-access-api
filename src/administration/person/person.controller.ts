import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { PersonService } from './person.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IPersonPaginatedResponse, IPersonResponse } from './person.interfaces';
import { UpdatePersonDto } from './person.dto';

import { systemsAccessGuard } from '../../systems/systems.guard';
import { TokenAuthGuard } from '../../authentication/token/token.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('person')
export class PersonController {
  constructor(private readonly _personService: PersonService) {}

  @Get()
  public async readAllPersons(@Query() paginationDto: PaginationDto): Promise<IPersonPaginatedResponse> {
    return await this._personService.readAllPersons(paginationDto);
  }

  @Get(':id')
  public async readPersonById(@Param('id', ParseIntPipe) id: number): Promise<IPersonResponse> {
    return await this._personService.readPersonById(id);
  }

  @Patch(':id')
  public async updatePerson(@Param('id', ParseIntPipe) id: number, @Body() personData: UpdatePersonDto): Promise<IPersonResponse> {
    return await this._personService.updatePerson(id, personData);
  }
}
