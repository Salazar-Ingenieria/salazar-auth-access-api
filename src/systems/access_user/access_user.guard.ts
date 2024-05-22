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
