import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { version } from 'package.json';

import { environment } from '@apps/api/auth/environments/environment';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @ApiTags('auth')
  getData() {
    return { app: 'api-auth', version, environment };
  }
}
