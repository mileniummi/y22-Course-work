import { Test, TestingModule } from '@nestjs/testing';
import { MyAdvertisementsController } from './my-advertisements.controller';

describe('MyAdvertisementsController', () => {
  let controller: MyAdvertisementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyAdvertisementsController],
    }).compile();

    controller = module.get<MyAdvertisementsController>(MyAdvertisementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
