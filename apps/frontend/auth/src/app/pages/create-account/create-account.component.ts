import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsYouType } from 'libphonenumber-js/max';
import { Observable } from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';

import { Countries, ICountry } from '@libs/frontend/countries';
import { IIpGeolocation, IpGeolocationService } from '@libs/frontend/utils/services/ip-geolocation';

@Component({
  selector: 'auth-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  private _countries: ICountry[];
  private _as_you_type: AsYouType;

  application_key: string;
  form_create_account: FormGroup;
  password_visible: boolean;
  filtered_countries: Observable<ICountry[]>;

  constructor(private _route: ActivatedRoute, private _ip_geolocation_svc: IpGeolocationService) {}

  get invalidCountrySelection(): boolean {
    return this.form_create_account
      ? !this.form_create_account.get('country').value || this.form_create_account.get('country').invalid
      : false;
  }

  ngOnInit(): void {
    this.form_create_account = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      country: new FormControl(null, [requireMatAutocompleteMatch]),
      phone: new FormControl(null),
      password: new FormControl(null),
    });
    this.password_visible = false;
    this._countries = new Countries().countries;

    this._route.queryParams.subscribe((params) => {
      this.application_key = params['application'];
    });

    this.filtered_countries = this.form_create_account.get('country').valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCountries(value))
    );

    this.form_create_account.get('country').valueChanges.subscribe((country: ICountry) => {
      if (country && country.alpha2) {
        this._as_you_type = new AsYouType(country.alpha2.toUpperCase() as any);
        if (this.form_create_account.get('phone').value) {
          this.form_create_account.get('phone').setValue(null);
        }
      } else {
        this._as_you_type = undefined;
        if (this.form_create_account.get('phone').value) {
          this.form_create_account.get('phone').setValue(null);
        }
      }
    });

    this.form_create_account
      .get('phone')
      .valueChanges.pipe(
        pairwise(),
        filter((values) => values[0] !== values[1])
      )
      .subscribe((values: string[]) => {
        const value = values[1];
        if (this.form_create_account.get('country').value && value) {
          const format = new AsYouType(this.form_create_account.get('country').value.alpha2.toUpperCase()).input(value);
          console.log(format);
          this.form_create_account.get('phone').setValue(format);
        } else {
          this.form_create_account.get('phone').setValue(null);
        }
      });

    this._getUserCountry();
  }

  private _filterCountries(value: string | ICountry): ICountry[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase();

    if (filterValue) {
      return this._countries.filter(
        (country) =>
          country.alpha2.toLowerCase().includes(filterValue) || country.name.toLowerCase().includes(filterValue)
      );
    }
    return this._countries;
  }

  private _getUserCountry(): void {
    this._ip_geolocation_svc.getIpGeolocationData(['country_code']).subscribe((data: IIpGeolocation) => {
      if (!this.form_create_account.get('country').value) {
        for (const country of this._countries) {
          if (country.alpha2.toLowerCase() === data.country_code.toLowerCase()) {
            this.form_create_account.get('country').setValue(country);
            break;
          }
        }
      }
    });
  }

  displayWithCountry(country: ICountry): string {
    return country ? country.name : undefined;
  }

  togglePasswordVisibility(event: MouseEvent): void {
    this.password_visible = !this.password_visible;
  }
}

function requireMatAutocompleteMatch(control: AbstractControl): { invalid: true } | null {
  if (control.value && typeof control.value === 'string') {
    return { invalid: true };
  }
  return null;
}
