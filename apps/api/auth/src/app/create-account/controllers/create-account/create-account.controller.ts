import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { BackendDbUserService, CreateUserDTO } from '@libs/backend/db/user';
import { GenericResponse } from '@libs/backend/utils/data-models';

import { MongoExceptionFilter } from '../../../filters/mongo-exception/mongo-exception.filter';

@Controller('create-account')
export class CreateAccountController {
  constructor(private readonly _userSvc: BackendDbUserService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  @ApiTags('auth')
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ description: 'User account created successfully.', type: GenericResponse })
  async getData(@Body() user: CreateUserDTO): Promise<GenericResponse> {
    await this._userSvc.create(user);
    return {
      message: 'User account created successfully.',
    };
  }
}
