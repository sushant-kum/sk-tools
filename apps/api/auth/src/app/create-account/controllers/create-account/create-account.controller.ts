import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AES, enc } from 'crypto-js';

import { BackendDbUserService, CreateUserDTO, User } from '@libs/backend/db/user';

import { MongoExceptionFilter } from '../../../filters/mongo-exception/mongo-exception.filter';

@Controller('create-account')
export class CreateAccountController {
  constructor(private readonly _user_svc: BackendDbUserService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: User })
  @ApiTags('auth')
  async getData(@Body() user: CreateUserDTO): Promise<User> {
    const encrypted: string = AES.encrypt(user.encrypted_password, user.encrypted_password).toString();
    const bytes = AES.decrypt(encrypted, user.encrypted_password);
    const decrypted: string = bytes.toString(enc.Utf8 as any);
    console.log('encrypted', encrypted);
    console.log('decrypted', decrypted);
    return this._user_svc.create(user);
  }
}
