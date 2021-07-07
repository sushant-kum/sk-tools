import { Module } from '@nestjs/common';

import { BackendUtilsCryptoService } from './services/backend-utils-crypto/backend-utils-crypto.service';

@Module({
  controllers: [],
  providers: [BackendUtilsCryptoService],
  exports: [BackendUtilsCryptoService],
})
export class BackendUtilsCryptoModule {}
