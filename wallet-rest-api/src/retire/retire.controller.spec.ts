import { Test, TestingModule } from '@nestjs/testing';
import { RetireController } from './retire.controller';

describe('RetireController', () => {
  let controller: RetireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetireController],
    }).compile();

    controller = module.get<RetireController>(RetireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
