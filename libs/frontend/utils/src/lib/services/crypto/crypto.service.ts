import { Injectable } from '@angular/core';
import { AES, enc, MD5 } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly _AES: {
    encrypt: (message: string, key: string) => string;
    decrypt: (cyphertext: string, key: string) => string;
  };

  private readonly _MD5: {
    hash: (message: string) => string;
  };

  constructor() {
    this._AES = Object.freeze({
      encrypt: (message: string, key: string): string => {
        return AES.encrypt(message, key).toString();
      },
      decrypt: (cyphertext: string, key: string): string => {
        return AES.decrypt(cyphertext, key).toString(enc.Utf8 as any);
      },
    });

    this._MD5 = Object.freeze({
      hash: (message: string): string => {
        return MD5(message).toString();
      },
    });
  }

  get AES() {
    return this._AES;
  }

  get MD5() {
    return this._MD5;
  }
}
