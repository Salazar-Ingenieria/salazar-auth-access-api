import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessUser } from './access_user/access_user.entity';
import { AccessRol } from './access_rol/access_rol.entity';
import { SubMenu } from './sub_menu/sub_menu.entity';
import { Menu } from './menu/menu.entity';
import { Rol } from './rol/rol.entity';
import { User } from './user/user.entity';

import { UserController } from './user/user.controller';
import { RolController } from './rol/rol.controller';
import { MenuController } from './menu/menu.controller';
import { SubMenuController } from './sub_menu/sub_menu.controller';
import { AccessRolController } from './access_rol/access_rol.controller';
import { AccessUserController } from './access_user/access_user.controller';

import { UserService } from './user/user.service';
import { RolService } from './rol/rol.service';
import { MenuService } from './menu/menu.service';
import { SubMenuService } from './sub_menu/sub_menu.service';
import { AccessRolService } from './access_rol/access_rol.service';
import { AccessUserService } from './access_user/access_user.service';

import { AccessUserGuard } from './access_user/access_user.guard';
import { AccessRolGuard } from './access_rol/access_rol.guard';
import { systemsAccessGuard } from './systems.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol, Menu, SubMenu, AccessRol, AccessUser])],
  controllers: [UserController, RolController, MenuController, SubMenuController, AccessRolController, AccessUserController],
  providers: [UserService, RolService, MenuService, SubMenuService, AccessRolService, AccessUserService, AccessUserGuard, AccessRolGuard, systemsAccessGuard],
  exports: [AccessUserGuard, AccessRolGuard, systemsAccessGuard],
})
export class SystemsModule {}
