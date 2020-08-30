import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IIpGeolocation, TIpGeolocationField, TIpGeolocationResponseLanguage } from './data-models/ip-deolocation';

@Injectable({
  providedIn: 'root',
})
export class IpGeolocationService {
  private readonly _api_key: string = 'bbdb1d89eef49b3e7a6f486a5a937bb0';

  constructor(private _http: HttpClient) {}

  getIpGeolocationData(
    fields?: TIpGeolocationField[],
    hostnameLookup?: boolean,
    securityLookup?: boolean,
    responseLanguage?: TIpGeolocationResponseLanguage,
    ip?: string
  ): Observable<IIpGeolocation> {
    const url = `http://api.ipstack.com/${ip ? ip : 'check'}`;
    const params: HttpParams = new HttpParams()
      .append('access_key', this._api_key)
      .append('fields', fields && fields.length > 0 ? fields.join(',') : undefined)
      .append('hostname', hostnameLookup ? '1' : undefined)
      .append('security', securityLookup ? '1' : undefined)
      .append('language', responseLanguage);

    return this._http.get<IIpGeolocation>(url, { params });
  }
}
