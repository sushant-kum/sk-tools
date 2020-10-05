import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @ApiTags('auth')
  getData() {
    return { message: 'Welcome to auth!' };
  }
}
