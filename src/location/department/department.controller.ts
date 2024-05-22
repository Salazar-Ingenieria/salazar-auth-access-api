import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { DepartmentService } from './department.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IDepartmentPaginatedResponse, IDepartmentResponse } from './department.interfaces';
import { UpdateDepartmentDto, WriteDepartmentDto } from './department.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../../systems/systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('departments')
export class DepartmentController {
  constructor(private readonly _departmentService: DepartmentService) {}

  @Get()
  public async readAllDepartments(@Query() paginationDto: PaginationDto): Promise<IDepartmentPaginatedResponse> {
    return await this._departmentService.readAllDepartments(paginationDto);
  }

  @Get(':id')
  public async readDepartmentById(@Param('id', ParseIntPipe) id: number): Promise<IDepartmentResponse> {
    return await this._departmentService.readDepartmentById(id);
  }

  @Post()
  public async writeDepartment(@Body() departmentData: WriteDepartmentDto): Promise<IDepartmentResponse> {
    return await this._departmentService.writeDepartment(departmentData);
  }

  @Patch(':id')
  public async updateDepartment(@Param('id', ParseIntPipe) id: number, @Body() departmentData: UpdateDepartmentDto): Promise<IDepartmentResponse> {
    return await this._departmentService.updateDepartment(id, departmentData);
  }
}
