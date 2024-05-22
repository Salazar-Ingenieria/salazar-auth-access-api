import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { GenreType } from '../administration/genre_type/genre_type.entity';
import { IdentificationType } from '../administration/identification_types/identification_type.entity';
import { Person } from '../administration/person/person.entity';

import { City } from '../location/city/city.entity';
import { Country } from '../location/country/country.entity';
import { Department } from '../location/department/department.entity';

import { AccessRol } from '../systems/access_rol/access_rol.entity';
import { AccessUser } from '../systems/access_user/access_user.entity';
import { Menu } from '../systems/menu/menu.entity';
import { Rol } from '../systems/rol/rol.entity';
import { SubMenu } from '../systems/sub_menu/sub_menu.entity';
import { User } from '../systems/user/user.entity';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const host = this.configService.get<string>(`HOST_DATABASE`);
    const port = this.configService.get<string>(`POSTGRES_PORT`);
    const username = this.configService.get<string>(`POSTGRES_USER`);
    const password = this.configService.get<string>(`POSTGRES_PASSWORD`);
    const database = this.configService.get<string>(`DATABASE`);

    const pool_max = parseInt(this.configService.get<string>('POSTGRES_POOL_MAX') || '20', 10);
    const pool_min = parseInt(this.configService.get<string>('POSTGRES_POOL_MIN') || '5', 10);
    const idle_timeout = parseInt(this.configService.get<string>('POSTGRES_IDLE_TIMEOUT') || '30000', 10);

    const connectionUrl = `postgresql://${username}:${password}@${host}:${port}/${database}`;

    return {
      type: 'postgres',
      url: connectionUrl,
      synchronize: false,
      entities: [GenreType, IdentificationType, Person, Country, Department, City, AccessUser, AccessRol, Menu, Rol, SubMenu, User],
      logging: ['error', 'warn', 'info', 'query'], // quita "query" en producción para no llenar discos con logs innecesarios
      extra: {
        max: pool_max,
        min: pool_min,
        idleTimeoutMillis: idle_timeout,
      },
    };
  }
}
