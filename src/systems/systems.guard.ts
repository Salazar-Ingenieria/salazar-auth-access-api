import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AccessUserGuard } from './access_user/access_user.guard';
import { AccessRolGuard } from './access_rol/access_rol.guard';

@Injectable()
export class systemsAccessGuard implements CanActivate {
  constructor(
    private readonly _accessUserGuard: AccessUserGuard,
    private readonly _accessRoleGuard: AccessRolGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userHasAccess = await this._accessUserGuard.canActivate(context);
    if (userHasAccess) return true;

    const roleHasAccess = await this._accessRoleGuard.canActivate(context);
    if (roleHasAccess) return true;

    throw new ForbiddenException('No tienes acceso a esta ruta.');
  }
}
