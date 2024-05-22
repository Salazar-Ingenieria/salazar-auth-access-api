import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { AccessRolService } from './access_rol.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IAccessRolPaginatedResponse, IAccessRolResponse } from './access_rol.interfaces';
import { UpdateAccessRolDto, WriteAccessRolDto } from './access_rol.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('access-roles')
export class AccessRolController {
  constructor(private readonly _accessRolService: AccessRolService) {}

  @Get()
  public async readAllAccessRols(@Query() paginationDto: PaginationDto): Promise<IAccessRolPaginatedResponse> {
    return await this._accessRolService.readAllAccessRols(paginationDto);
  }

  @Get(':id')
  public async readAccessRolById(@Param('id', ParseIntPipe) id: number): Promise<IAccessRolResponse> {
    return await this._accessRolService.readAccessRolById(id);
  }

  @Post()
  public async writeAccessRol(@Body() accessRolData: WriteAccessRolDto): Promise<IAccessRolResponse> {
    return await this._accessRolService.writeAccessRol(accessRolData);
  }

  @Patch(':id')
  public async updateAccessRol(@Param('id', ParseIntPipe) id: number, @Body() accessRolData: UpdateAccessRolDto): Promise<IAccessRolResponse> {
    return await this._accessRolService.updateAccessRol(id, accessRolData);
  }
}
