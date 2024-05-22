import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from './database/database.module';
import { LocationModule } from './location/location.module';
import { AdministrationModule } from './administration/administration.module';
import { SystemsModule } from './systems/systems.module';

import { DatabaseService } from './database/database.service';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
    DatabaseModule,
    LocationModule,
    AdministrationModule,
    SystemsModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
