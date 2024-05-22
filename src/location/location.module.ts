import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { City } from './city/city.entity';
import { Country } from './country/country.entity';
import { Department } from './department/department.entity';

import { CountryController } from './country/country.controller';
import { DepartmentController } from './department/department.controller';
import { CityController } from './city/city.controller';

import { CountryService } from './country/country.service';
import { DepartmentService } from './department/department.service';
import { CityService } from './city/city.service';

import { SystemsModule } from '../systems/systems.module';

@Module({
  imports: [TypeOrmModule.forFeature([City, Country, Department]), SystemsModule],
  controllers: [CountryController, DepartmentController, CityController],
  providers: [CountryService, DepartmentService, CityService],
})
export class LocationModule {}
