import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country_alpha2: String,
  phone: String,
  encrypted_password: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
});
