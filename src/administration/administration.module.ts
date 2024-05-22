import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Person } from './person/person.entity';
import { IdentificationType } from './identification_types/identification_type.entity';
import { GenreType } from './genre_type/genre_type.entity';

import { PersonController } from './person/person.controller';
import { IdentificationTypesController } from './identification_types/identification_types.controller';
import { GenreTypeController } from './genre_type/genre_type.controller';

import { PersonService } from './person/person.service';
import { IdentificationTypesService } from './identification_types/identification_types.service';
import { GenreTypeService } from './genre_type/genre_type.service';

import { SystemsModule } from '../systems/systems.module';

@Module({
  imports: [TypeOrmModule.forFeature([GenreType, IdentificationType, Person]), SystemsModule],
  controllers: [PersonController, IdentificationTypesController, GenreTypeController],
  providers: [PersonService, IdentificationTypesService, GenreTypeService],
})
export class AdministrationModule {}
