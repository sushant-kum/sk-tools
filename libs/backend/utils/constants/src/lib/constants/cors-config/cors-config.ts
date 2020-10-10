import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export class CorsConfig {
  static readonly config: CorsOptions = Object.freeze({
    origin: '*',
  });

  static readonly configProd: CorsOptions = Object.freeze({
    origin: [
      'https://sk-tools.sushantk.com',
      'https://testbed.sk-tools.sushantk.com',
      'http://sk-tools.sushantk.com',
      'http://testbed.sk-tools.sushantk.com',
      'https://www.sk-tools.sushantk.com',
      'https://www.testbed.sk-tools.sushantk.com',
      'http://www.sk-tools.sushantk.com',
      'http://www.testbed.sk-tools.sushantk.com',
    ],
  });
}
