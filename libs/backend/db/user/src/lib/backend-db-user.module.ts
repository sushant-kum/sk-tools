import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './schemas/user';
import { BackendDbUserService } from './services/backend-db-user/backend-db-user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [],
  providers: [BackendDbUserService],
  exports: [BackendDbUserService],
})
export class BackendDbUserModule {}
