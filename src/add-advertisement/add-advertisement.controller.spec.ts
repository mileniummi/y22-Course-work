import { Test, TestingModule } from '@nestjs/testing';
import { AddAdvertisementController } from './add-advertisement.controller';

describe('AddAdvertisementController', () => {
  let controller: AddAdvertisementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddAdvertisementController],
    }).compile();

    controller = module.get<AddAdvertisementController>(AddAdvertisementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
