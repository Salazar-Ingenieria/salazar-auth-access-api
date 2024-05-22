import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Menu } from './menu.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IMenuPaginatedResponse, IMenuResponse } from './menu.interfaces';
import { UpdateMenuDto, WriteMenuDto } from './menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly _menuRepository: Repository<Menu>,
  ) {}

  public async readAllMenus(paginationDto: PaginationDto): Promise<IMenuPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._menuRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readMenuById(id: number): Promise<IMenuResponse> {
    const menu = await this._menuRepository.findOne({ where: { id } });
    if (!menu) throw new NotFoundException({ message: 'Menú no encontrado.' });

    return { data: menu, message: 'Menú encontrado.' };
  }

  public async writeMenu(menuData: WriteMenuDto): Promise<IMenuResponse> {
    const existingMenu = await this._menuRepository.findOne({ where: { name: menuData.name } });
    if (existingMenu) throw new ConflictException({ message: 'Pruebe con un nombre de menú diferente.' });

    const createMenu = this._menuRepository.create(menuData);
    const saveMenu = await this._menuRepository.save(createMenu);

    return { data: saveMenu, message: 'Menú creado satisfactoriamente.' };
  }

  public async updateMenu(id: number, menuData: UpdateMenuDto): Promise<IMenuResponse> {
    const menu = await this._menuRepository.findOne({ where: { id } });
    if (!menu) throw new NotFoundException({ message: 'Menú no encontrado.' });

    if (menuData.name) {
      const existingMenu = await this._menuRepository.findOne({ where: { name: menuData.name } });

      if (existingMenu && existingMenu.id !== id) throw new ConflictException({ message: 'Pruebe con un nombre de menú diferente.' });
    }

    Object.assign(menu, menuData);
    const updatedMenu = await this._menuRepository.save(menu);

    return { data: updatedMenu, message: 'Menú actualizado satisfactoriamente.' };
  }
}
