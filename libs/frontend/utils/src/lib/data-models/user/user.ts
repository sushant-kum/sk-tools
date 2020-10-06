export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  country_alpha2?: string;
  phone?: string;
  encrypted_password: string;
  created_date?: Date;
  is_active?: boolean;
}
