import { Test } from '@nestjs/testing';

import { BackendDbUserService } from './backend-db-user.service';

describe('BackendDbUserService', () => {
  let service: BackendDbUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendDbUserService],
    }).compile();

    service = module.get(BackendDbUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
