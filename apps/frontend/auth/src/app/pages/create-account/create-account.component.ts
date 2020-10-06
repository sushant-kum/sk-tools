import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { saveAs as fileSaveAs } from 'file-saver';
import { AsYouType, parsePhoneNumber } from 'libphonenumber-js/max';
import { Observable, Subject } from 'rxjs';
import { filter, map, pairwise, startWith, takeUntil } from 'rxjs/operators';

import { Countries, ICountry } from '@libs/frontend/countries';
import { CryptoService } from '@libs/frontend/utils';
import { IIpGeolocation, IpGeolocationService } from '@libs/frontend/utils/services/ip-geolocation';
import { SnackbarService } from '@libs/frontend/utils/services/snackbar';

import { CreateAccountService } from './services/create-account/create-account.service';

interface Mode {
  account_created: boolean;
}

@Component({
  selector: 'auth-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  private _destroyer_subject: Subject<any> = new Subject<any>();

  private _countries: ICountry[];

  mode: Mode = {
    account_created: false,
  };

  form_create_account: FormGroup;
  password_visible: boolean;
  filtered_countries: Observable<ICountry[]>;

  recovery_key: string;

  constructor(
    private _create_account_scv: CreateAccountService,
    private _snack_bar_svc: SnackbarService,
    private _ip_geolocation_svc: IpGeolocationService,
    private _crypto_svc: CryptoService,
    private _router: Router
  ) {}

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
      password: new FormControl(null, [Validators.required]),
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
          this.form_create_account.get('phone').setValue(format);
        } else {
          this.form_create_account.get('phone').setValue(null);
        }
      });

    this._getUserCountry();
  }

  ngOnDestroy(): void {
    this._destroyer_subject.next();
    this._destroyer_subject.unsubscribe();
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

  createAccount(): void {
    this._create_account_scv
      .createAccount(
        this.form_create_account.get('first_name').value,
        this.form_create_account.get('last_name').value,
        this.form_create_account.get('email').value,
        this.form_create_account.get('password').value,
        this.form_create_account.get('country').value ? this.form_create_account.get('country').value.alpha2 : null,
        this.form_create_account.get('phone').value
          ? parsePhoneNumber(
              `+${this.form_create_account.get('country').value.phone} ${this.form_create_account.get('phone').value}`
            ).nationalNumber.toString()
          : null
      )
      .pipe(takeUntil(this._destroyer_subject))
      .subscribe(
        () => {
          this.mode.account_created = true;
          this.recovery_key = this._crypto_svc.MD5.hash(this.form_create_account.get('password').value);
          this._snack_bar_svc.show('Account created successfully.', 'success', 'OK', { duration: 5000 });
        },
        (err: HttpErrorResponse) => {
          if (err.error.message.includes('E11000') && err.error.keys.includes('email')) {
            this._snack_bar_svc
              .show('Account with this email address already exists. Proceed to sign in.', 'error', 'Sign in', {
                duration: 5000,
              })
              .onAction()
              .pipe(takeUntil(this._destroyer_subject))
              .subscribe(() => {
                this._router.navigate(['/', 'login'], { queryParamsHandling: 'preserve' });
              });
          } else {
            this._snack_bar_svc.show('Something went wrong. Please try again later.', 'error', 'OK', {
              duration: 5000,
            });
          }
        }
      );
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
