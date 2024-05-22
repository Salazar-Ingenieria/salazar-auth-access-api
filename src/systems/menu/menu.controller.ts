import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { MenuService } from './menu.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IMenuPaginatedResponse, IMenuResponse } from './menu.interfaces';
import { UpdateMenuDto, WriteMenuDto } from './menu.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('menus')
export class MenuController {
  constructor(private readonly _menuService: MenuService) {}

  @Get()
  public async readAllMenus(@Query() paginationDto: PaginationDto): Promise<IMenuPaginatedResponse> {
    return this._menuService.readAllMenus(paginationDto);
  }

  @Get(':id')
  public async readMenuById(@Param('id', ParseIntPipe) id: number): Promise<IMenuResponse> {
    return this._menuService.readMenuById(id);
  }

  @Post()
  public async writeMenu(@Body() menuData: WriteMenuDto): Promise<IMenuResponse> {
    return this._menuService.writeMenu(menuData);
  }

  @Patch(':id')
  public async updateMenu(@Param('id', ParseIntPipe) id: number, @Body() menuData: UpdateMenuDto): Promise<IMenuResponse> {
    return this._menuService.updateMenu(id, menuData);
  }
}
