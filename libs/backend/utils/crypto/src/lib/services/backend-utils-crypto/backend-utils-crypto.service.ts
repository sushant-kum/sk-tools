import { Injectable } from '@nestjs/common';
import { AES, enc } from 'crypto-js';

@Injectable()
export class BackendUtilsCryptoService {
  AES: {
    encrypt: (message: string, key: string) => string;
    decrypt: (cyphertext: string, key: string) => string;
  } = {
    encrypt: (message: string, key: string): string => {
      return AES.encrypt(message, key).toString();
    },
    decrypt: (cyphertext: string, key: string): string => {
      return AES.decrypt(cyphertext, key).toString(enc.Utf8 as any);
    },
  };
}
