import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { IUserPaginatedResponse, IUserResponse } from './user.interfaces';
import { UpdateUserDto, WriteUserDto } from './user.dto';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  public async readAllUsers(@Query() paginationDto: PaginationDto): Promise<IUserPaginatedResponse> {
    return await this._userService.readAllUsers(paginationDto);
  }

  @Get(':id')
  public async readUserById(@Param('id', ParseIntPipe) id: number): Promise<IUserResponse> {
    return await this._userService.readUserById(id);
  }

  @Post()
  public async writeUser(@Body() userData: WriteUserDto): Promise<IUserResponse> {
    return await this._userService.writeUser(userData);
  }

  @Patch(':id')
  public async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userData: UpdateUserDto): Promise<IUserResponse> {
    return await this._userService.updateUser(id, userData);
  }
}
