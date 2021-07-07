import { Country } from 'countries-list';

export interface ICountry extends Country {
  alpha2: string;
  flag: string;
}
