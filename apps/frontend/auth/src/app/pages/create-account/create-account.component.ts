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
  private _destroyerSubject: Subject<any> = new Subject<any>();

  private _countries: ICountry[];

  mode: Mode = {
    account_created: false,
  };

  formCreateAccount: FormGroup;
  passwordVisible: boolean;
  filteredCountries: Observable<ICountry[]>;

  recoveryKey: string;

  constructor(
    private _createAccountScv: CreateAccountService,
    private _snackBarSvc: SnackbarService,
    private _ipGeolocationSvc: IpGeolocationService,
    private _cryptoSvc: CryptoService,
    private _router: Router
  ) {}

  get invalidCountrySelection(): boolean {
    return this.formCreateAccount
      ? !this.formCreateAccount.get('country').value || this.formCreateAccount.get('country').invalid
      : false;
  }

  ngOnInit(): void {
    this.formCreateAccount = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      country: new FormControl(null, [requireMatAutocompleteMatch]),
      phone: new FormControl(null),
      password: new FormControl(null, [Validators.required]),
    });
    this.passwordVisible = false;
    this._countries = new Countries().countries;

    this.filteredCountries = this.formCreateAccount.get('country').valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCountries(value))
    );

    this.formCreateAccount.get('country').valueChanges.subscribe((country: ICountry) => {
      if (country && country.alpha2) {
        if (this.formCreateAccount.get('phone').value) {
          this.formCreateAccount.get('phone').setValue(null);
        }
      } else {
        if (this.formCreateAccount.get('phone').value) {
          this.formCreateAccount.get('phone').setValue(null);
        }
      }
    });

    this.formCreateAccount
      .get('phone')
      .valueChanges.pipe(
        pairwise(),
        filter((values) => values[0] !== values[1])
      )
      .subscribe((values: string[]) => {
        const value = values[1];
        if (this.formCreateAccount.get('country').value && value) {
          const format = new AsYouType(this.formCreateAccount.get('country').value.alpha2.toUpperCase()).input(value);
          this.formCreateAccount.get('phone').setValue(format);
        } else {
          this.formCreateAccount.get('phone').setValue(null);
        }
      });

    this._getUserCountry();
  }

  ngOnDestroy(): void {
    this._destroyerSubject.next();
    this._destroyerSubject.unsubscribe();
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
    this._ipGeolocationSvc.getIpGeolocationData(['country_code']).subscribe((data: IIpGeolocation) => {
      if (!this.formCreateAccount.get('country').value) {
        for (const country of this._countries) {
          if (country.alpha2.toLowerCase() === data.country_code.toLowerCase()) {
            this.formCreateAccount.get('country').setValue(country);
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
    this.passwordVisible = !this.passwordVisible;
  }

  createAccount(): void {
    this._createAccountScv
      .createAccount(
        this.formCreateAccount.get('firstName').value,
        this.formCreateAccount.get('lastName').value,
        this.formCreateAccount.get('email').value,
        this.formCreateAccount.get('password').value,
        this.formCreateAccount.get('country').value ? this.formCreateAccount.get('country').value.alpha2 : null,
        this.formCreateAccount.get('phone').value
          ? parsePhoneNumber(
              `+${this.formCreateAccount.get('country').value.phone} ${this.formCreateAccount.get('phone').value}`
            ).nationalNumber.toString()
          : null
      )
      .pipe(takeUntil(this._destroyerSubject))
      .subscribe(
        () => {
          this.mode.account_created = true;
          this.recoveryKey = this._cryptoSvc.MD5.hash(this.formCreateAccount.get('password').value);
          this._snackBarSvc.show('Account created successfully.', 'success', 'OK', { duration: 5000 });
        },
        (err: HttpErrorResponse) => {
          if (err.error.message.includes('E11000') && err.error.keys.includes('email')) {
            this._snackBarSvc
              .show('Account with this email address already exists. Proceed to sign in.', 'error', 'Sign in', {
                duration: 5000,
              })
              .onAction()
              .pipe(takeUntil(this._destroyerSubject))
              .subscribe(() => {
                this._router.navigate(['/', 'login'], { queryParamsHandling: 'preserve' });
              });
          } else {
            this._snackBarSvc.show('Something went wrong. Please try again later.', 'error', 'OK', {
              duration: 5000,
            });
          }
        }
      );
  }

  downloadRecoveryKey(): void {
    fileSaveAs(new Blob([this.recoveryKey], { type: 'text/plain;charset=utf-8' }), 'SK-TOOLS-RECOVERYKEY.txt');
    this._snackBarSvc.show('Downloading recovery key as text file.', 'info', 'Ok', { duration: 5000 });
  }

  copiedRecoveryKey(event: boolean): void {
    if (event) {
      this._snackBarSvc.show('Recovery key copied successfully to clipboard.', 'success', 'Ok', { duration: 5000 });
    } else {
      this._snackBarSvc.show('Copy to clipboard failed. Try again.', 'error', null, { duration: 5000 });
    }
  }
}

function requireMatAutocompleteMatch(control: AbstractControl): { invalid: true } | null {
  if (control.value && typeof control.value === 'string') {
    return { invalid: true };
  }
  return null;
}
