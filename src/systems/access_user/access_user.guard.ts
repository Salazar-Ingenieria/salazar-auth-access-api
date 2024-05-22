import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request } from 'express';
import { match } from 'path-to-regexp';

import { AccessUser } from './access_user.entity';
import { User } from '../user/user.entity';

@Injectable()
export class AccessUserGuard implements CanActivate {
  constructor(
    @InjectRepository(AccessUser)
    private readonly accessRepository: Repository<AccessUser>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    if (!user) return false;

    const accesses = await this.accessRepository.find({
      where: { userId: user.id, isActive: true },
      relations: { menu: { subMenus: true } }
    });

     
    return accesses.some((access) => {
      if (!access.menu) return false;

      if (!access.menu.isActive) return false;

      if (access.menu.route_back) {
        const menuMatcher = match(access.menu.route_back, { decode: decodeURIComponent });
        const menuResult = menuMatcher(request.path);
        if (menuResult !== false) return true;
      }

      return (
        access.menu.subMenus?.some((subMenu) => {
          if (!subMenu.isActive) return false;

          if (!subMenu.route) return false;

          const subMenuMatcher = match(subMenu.route, { decode: decodeURIComponent });

          const subMenuResult = subMenuMatcher(request.path);

          if (subMenuResult !== false) return true;
          
          return false;
        }) ?? false
      );
    });
  }
}
