import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CryptoService, GenericResponse, User } from '@libs/frontend/utils';

import { environment as env } from '@apps/frontend/auth/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountService {
  constructor(private readonly _http: HttpClient, private readonly _cryptoSvc: CryptoService) {}

  createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    countryAlpha2?: string,
    phone?: string
  ): Observable<GenericResponse> {
    const url = `${env.apiUrls.authCreateAccount}/create-account`;
    const encryptedPassword: string = this._cryptoSvc.AES.encrypt(password, this._cryptoSvc.MD5.hash(password));
    const payload: User = {
      firstName,
      lastName,
      email,
      countryAlpha2,
      phone,
      encryptedPassword,
    };

    return this._http.post<GenericResponse>(url, payload);
  }
}
