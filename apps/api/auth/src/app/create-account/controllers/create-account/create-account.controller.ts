import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { BackendDbUserService, CreateUserDTO } from '@libs/backend/db/user';
import { GenericResponse } from '@libs/backend/utils/data-models';

import { MongoExceptionFilter } from '../../../filters/mongo-exception/mongo-exception.filter';

@Controller('create-account')
export class CreateAccountController {
  constructor(private readonly _user_svc: BackendDbUserService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ description: 'User account created successfully.', type: GenericResponse })
  @ApiTags('auth')
  async getData(@Body() user: CreateUserDTO): Promise<GenericResponse> {
    await this._user_svc.create(user);
    return {
      message: 'User account created successfully.',
    };
  }
}
