import { Test, TestingModule } from '@nestjs/testing';
import { RetireService } from './retire.service';

describe('RetireService', () => {
  let service: RetireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetireService],
    }).compile();

    service = module.get<RetireService>(RetireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
