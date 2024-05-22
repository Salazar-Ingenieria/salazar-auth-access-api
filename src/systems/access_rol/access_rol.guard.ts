import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { match } from 'path-to-regexp';

import { AccessRol } from './access_rol.entity';
import { User } from '../user/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

@Injectable()
export class AccessRolGuard implements CanActivate {
  constructor(
    @InjectRepository(AccessRol)
    private readonly accessRolRepository: Repository<AccessRol>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user?.rol) return false;

    const accesses = await this.accessRolRepository.find({
      where: { rolId: user.rol.id, isActive: true },
      relations: { menu: true },
    });

    return accesses.some((access) => {
      if (!access.menu) return false;

      if (!access.menu.isActive) return false;

      if (!access.menu.route_back) return false;

      return !!match(access.menu.route_back, { decode: decodeURIComponent })(request.path);
    });
  }
}
