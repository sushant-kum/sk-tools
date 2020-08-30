import { countries } from 'countries-list';

import { ICountry } from '../data-models/countries';

export class Countries {
  private _countries: ICountry[] = Object.keys(countries)
    .map((country_code) => {
      const country: ICountry = countries[country_code];
      country.alpha2 = country_code;
      country.flag = `https://www.countryflags.io/${country_code.toLowerCase()}/flat/24.png`;

      return country;
    })
    .sort((a: ICountry, b: ICountry) => {
      if (a.name < b.name) return -1;
      return 1;
    });

  constructor() {}

  get countries(): ICountry[] {
    return this._countries;
  }
}
