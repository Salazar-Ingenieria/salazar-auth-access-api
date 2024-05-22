import { Controller, UseGuards } from '@nestjs/common';

import { TokenAuthGuard } from '../../authentication/token/token.guard';
import { systemsAccessGuard } from '../systems.guard';

@UseGuards(TokenAuthGuard, systemsAccessGuard)
@Controller('access-user')
export class AccessUserController {}
