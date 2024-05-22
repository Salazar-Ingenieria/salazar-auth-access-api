import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from '../systems/user/user.entity';
import { Person } from '../administration/person/person.entity';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TokenService } from './token/token.service';
import { TokenStrategy } from './token/token.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

import { AdministrationModule } from '../administration/administration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Person]),
    AdministrationModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '5h' },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, TokenService, TokenStrategy, GoogleStrategy],
  exports: [PassportModule, JwtModule, TokenService],
})
export class AuthenticationModule {}
