export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  countryAlpha2?: string;
  phone?: string;
  encryptedPassword: string;
  createdDate?: Date;
  isActive?: boolean;
}
