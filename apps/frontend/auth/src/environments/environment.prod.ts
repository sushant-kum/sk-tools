import { config } from 'package.json';

export const environment = {
  production: true,
  apiUrls: {
    authCreateAccount: `${config.prod.apiauth.hostname}/${config.prod.apiauth.prefix}`,
  },
};
