import { Test, TestingModule } from '@nestjs/testing';
import { MortgagesController } from './mortgages.controller';

describe('MortgagesController', () => {
  let controller: MortgagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MortgagesController],
    }).compile();

    controller = module.get<MortgagesController>(MortgagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
