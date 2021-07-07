import { Test } from '@nestjs/testing';

import { BackendUtilsCryptoService } from './backend-utils-crypto.service';

describe('BackendUtilsCryptoService', () => {
  let service: BackendUtilsCryptoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendUtilsCryptoService],
    }).compile();

    service = module.get(BackendUtilsCryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
