import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { USER_SCHEMA } from './schemas/user';
import { BackendDbUserService } from './services/backend-db-user/backend-db-user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: USER_SCHEMA }])],
  controllers: [],
  providers: [BackendDbUserService],
  exports: [BackendDbUserService],
})
export class BackendDbUserModule {}
