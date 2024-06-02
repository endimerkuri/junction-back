import { Test, TestingModule } from '@nestjs/testing';
import { ChargeSessionsService } from './charge-sessions.service';

describe('ChargeSessionsService', () => {
  let service: ChargeSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargeSessionsService],
    }).compile();

    service = module.get<ChargeSessionsService>(ChargeSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
