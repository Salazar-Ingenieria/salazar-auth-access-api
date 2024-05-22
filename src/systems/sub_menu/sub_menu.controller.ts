import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { SubMenuService } from './sub_menu.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { ISubMenuPaginatedResponse, ISubMenuResponse } from './sub_menu.interfaces';
import { UpdateSubMenuDto, WriteSubMenuDto } from './sub_menu.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('sub-menus')
export class SubMenuController {
  constructor(private readonly _subMenuService: SubMenuService) {}

  @Get()
  public async readAllSubMenus(@Query() paginationDto: PaginationDto): Promise<ISubMenuPaginatedResponse> {
    return this._subMenuService.readAllSubMenus(paginationDto);
  }

  @Get(':id')
  public async readSubMenuById(@Param('id', ParseIntPipe) id: number): Promise<ISubMenuResponse> {
    return this._subMenuService.readSubMenuById(id);
  }

  @Post()
  public async writeSubMenu(@Body() subMenuData: WriteSubMenuDto): Promise<ISubMenuResponse> {
    return this._subMenuService.writeSubMenu(subMenuData);
  }

  @Patch(':id')
  public async updateSubMenu(@Param('id', ParseIntPipe) id: number, @Body() subMenuData: UpdateSubMenuDto): Promise<ISubMenuResponse> {
    return this._subMenuService.updateSubMenu(id, subMenuData);
  }
}
