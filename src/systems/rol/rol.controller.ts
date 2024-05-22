import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { RolService } from './rol.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IRolPaginatedResponse, IRolResponse } from './rol.interfaces';
import { UpdateRolDto, WriteRolDto } from './rol.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('roles')
export class RolController {
  constructor(private readonly _rolService: RolService) {}

  @Get()
  public async readAllRols(@Query() paginationDto: PaginationDto): Promise<IRolPaginatedResponse> {
    return this._rolService.readAllRols(paginationDto);
  }

  @Get(':id')
  public async readRolById(@Param('id', ParseIntPipe) id: number): Promise<IRolResponse> {
    return this._rolService.readRolById(id);
  }

  @Post()
  public async writeRol(@Body() rolData: WriteRolDto): Promise<IRolResponse> {
    return this._rolService.writeRol(rolData);
  }

  @Patch(':id')
  public async updateRol(@Param('id', ParseIntPipe) id: number, @Body() rolData: UpdateRolDto): Promise<IRolResponse> {
    return this._rolService.updateRol(id, rolData);
  }
}
