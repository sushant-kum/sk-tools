import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CryptoService, GenericResponse, User } from '@libs/frontend/utils';

import { environment as env } from '@apps/frontend/auth/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountService {
  constructor(private readonly _http: HttpClient, private readonly _crypto_svc: CryptoService) {}

  createAccount(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    country_alpha2?: string,
    phone?: string
  ): Observable<GenericResponse> {
    const url = `${env.api_urls.auth__create_account}/create-account`;
    const encrypted_password: string = this._crypto_svc.AES.encrypt(password, this._crypto_svc.MD5.hash(password));
    const payload: User = {
      first_name,
      last_name,
      email,
      country_alpha2,
      phone,
      encrypted_password,
    };

    return this._http.post<GenericResponse>(url, payload);
  }
}
