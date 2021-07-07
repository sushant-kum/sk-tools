import { Module } from '@nestjs/common';

import { BackendDbUserModule } from '@libs/backend/db/user';

import { CreateAccountController } from './controllers/create-account/create-account.controller';
import { CreateAccountService } from './services/create-account/create-account.service';

@Module({
  imports: [BackendDbUserModule],
  providers: [CreateAccountService],
  controllers: [CreateAccountController],
})
export class CreateAccountModule {}
