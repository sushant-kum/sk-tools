import { countries } from 'countries-list';

import { ICountry } from '../data-models/countries';

export class Countries {
  private _countries: ICountry[] = Object.keys(countries)
    .map((countryCode) => {
      const country: ICountry = countries[countryCode];
      country.alpha2 = countryCode;
      country.flag = `https://www.countryflags.io/${countryCode.toLowerCase()}/flat/24.png`;

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
