import { config } from 'package.json';

import { CorsConfig } from '@libs/backend/utils/constants';

export const environment = {
  production: false,
  hostname: 'http://localhost',
  port: process.env.PORT || config.dev.apiauth.port,
  prefix: config.dev.apiauth.prefix,
  corsConfig: CorsConfig.config,
};
