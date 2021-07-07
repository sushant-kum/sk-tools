import { config } from 'package.json';

import { CorsConfig } from '@libs/backend/utils/constants';

export const environment = {
  production: true,
  hostname: config.prod.apiauth.hostname,
  port: process.env.PORT || config.prod.apiauth.port,
  prefix: config.prod.apiauth.prefix,
  corsConfig: CorsConfig.configProd,
};
