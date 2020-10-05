import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

import { BackendDbUserModule } from '@libs/backend/db/user';

import { AppController } from './controllers/app/app.controller';
import { CreateAccountModule } from './create-account/create-account.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_ADDRESS}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    ),
    BackendDbUserModule,
    CreateAccountModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
