import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { IdentificationTypesService } from './identification_types.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IIdentificationTypePaginatedResponse, IIdentificationTypeResponse } from './identification_type.interfaces';
import { UpdateIdentificationTypeDto, WriteIdentificationTypeDto } from './identification_types.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../../systems/systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('identification-types')
export class IdentificationTypesController {
  constructor(private readonly _identificationTypesService: IdentificationTypesService) {}

  @Get()
  public async readAllIdentificationTypes(@Query() paginationDto: PaginationDto): Promise<IIdentificationTypePaginatedResponse> {
    return await this._identificationTypesService.readAllIdentificationTypes(paginationDto);
  }

  @Get(':id')
  public async readIdentificationTypeById(@Param('id', ParseIntPipe) id: number): Promise<IIdentificationTypeResponse> {
    return await this._identificationTypesService.readIdentificationTypeById(id);
  }

  @Post()
  public async writeIdentificationType(@Body() identificationTypeData: WriteIdentificationTypeDto): Promise<IIdentificationTypeResponse> {
    return await this._identificationTypesService.writeIdentificationType(identificationTypeData);
  }

  @Patch(':id')
  public async updateIdentificationType(@Param('id', ParseIntPipe) id: number, @Body() identificationTypeData: UpdateIdentificationTypeDto): Promise<IIdentificationTypeResponse> {
    return await this._identificationTypesService.updateIdentificationType(id, identificationTypeData);
  }
}
