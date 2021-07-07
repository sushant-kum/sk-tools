import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDTO, User } from '../../models/user';

@Injectable()
export class BackendDbUserService {
  constructor(@InjectModel('User') private readonly _userModel: Model<User>) {}

  create(user: CreateUserDTO): Promise<User> {
    return new this._userModel(user).save();
  }
}
