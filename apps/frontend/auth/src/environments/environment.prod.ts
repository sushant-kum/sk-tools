import { config } from 'package.json';

export const environment = {
  production: true,
  api_urls: {
    auth__create_account: `/${config.prod.apiauth.prefix}`,
  },
};
