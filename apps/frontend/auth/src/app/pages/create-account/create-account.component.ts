import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { saveAs as fileSaveAs } from 'file-saver';
import { AsYouType } from 'libphonenumber-js/max';
import { Observable } from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';

import { Countries, ICountry } from '@libs/frontend/countries';
import { IIpGeolocation, IpGeolocationService } from '@libs/frontend/utils/services/ip-geolocation';
import { SnackbarService } from '@libs/frontend/utils/services/snackbar';

interface Mode {
  account_created: boolean;
}

@Component({
  selector: 'auth-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  private _countries: ICountry[];

  mode: Mode = {
    account_created: false,
  };

  form_create_account: FormGroup;
  password_visible: boolean;
  filtered_countries: Observable<ICountry[]>;

  recovery_key: string;

  constructor(private _snack_bar_svc: SnackbarService, private _ip_geolocation_svc: IpGeolocationService) {}

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

    this.filtered_countries = this.form_create_account.get('country').valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCountries(value))
    );

    this.form_create_account.get('country').valueChanges.subscribe((country: ICountry) => {
      if (country && country.alpha2) {
        if (this.form_create_account.get('phone').value) {
          this.form_create_account.get('phone').setValue(null);
        }
      } else {
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

  downloadRecoveryKey(): void {
    fileSaveAs(new Blob([this.recovery_key], { type: 'text/plain;charset=utf-8' }), 'SK-TOOLS-RECOVERYKEY.txt');
    this._snack_bar_svc.show('Downloading recovery key as text file.', 'info', 'Ok', { duration: 5000 });
  }

  copiedRecoveryKey(event: boolean): void {
    if (event) {
      this._snack_bar_svc.show('Recovery key copied successfully to clipboard.', 'success', 'Ok', { duration: 5000 });
    } else {
      this._snack_bar_svc.show('Copy to clipboard failed. Try again.', 'error', null, { duration: 5000 });
    }
  }
}

function requireMatAutocompleteMatch(control: AbstractControl): { invalid: true } | null {
  if (control.value && typeof control.value === 'string') {
    return { invalid: true };
  }
  return null;
}
