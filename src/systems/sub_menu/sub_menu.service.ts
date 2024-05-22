import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubMenu } from './sub_menu.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { ISubMenuPaginatedResponse, ISubMenuResponse } from './sub_menu.interfaces';
import { UpdateSubMenuDto, WriteSubMenuDto } from './sub_menu.dto';

@Injectable()
export class SubMenuService {
  constructor(
    @InjectRepository(SubMenu)
    private readonly _subMenuRepository: Repository<SubMenu>,
  ) {}

  public async readAllSubMenus(paginationDto: PaginationDto): Promise<ISubMenuPaginatedResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this._subMenuRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
      relations: { menu: true },
    });

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async readSubMenuById(id: number): Promise<ISubMenuResponse> {
    const subMenu = await this._subMenuRepository.findOne({ where: { id }, relations: { menu: true } });
    if (!subMenu) throw new NotFoundException({ message: 'Submenú no encontrado.' });

    return { data: subMenu, message: 'Submenú encontrado.' };
  }

  public async writeSubMenu(subMenuData: WriteSubMenuDto): Promise<ISubMenuResponse> {
    const existingSubMenu = await this._subMenuRepository.findOne({ where: { name: subMenuData.name } });
    if (existingSubMenu) throw new ConflictException({ message: 'Pruebe con un nombre de submenú diferente.' });

    const createSubMenu = this._subMenuRepository.create(subMenuData);
    const saveSubMenu = await this._subMenuRepository.save(createSubMenu);

    return { data: saveSubMenu, message: 'Submenú creado satisfactoriamente.' };
  }

  public async updateSubMenu(id: number, subMenuData: UpdateSubMenuDto): Promise<ISubMenuResponse> {
    const subMenu = await this._subMenuRepository.findOne({ where: { id } });
    if (!subMenu) throw new NotFoundException({ message: 'Submenú no encontrado.' });

    if (subMenuData.name) {
      const existingSubMenu = await this._subMenuRepository.findOne({ where: { name: subMenuData.name } });

      if (existingSubMenu && existingSubMenu.id !== id) throw new ConflictException({ message: 'Pruebe con un nombre de submenú diferente.' });
    }

    Object.assign(subMenu, subMenuData);
    const updatedSubMenu = await this._subMenuRepository.save(subMenu);

    return { data: updatedSubMenu, message: 'Submenú actualizado satisfactoriamente.' };
  }
}
