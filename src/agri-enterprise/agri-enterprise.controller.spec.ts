import { Test, TestingModule } from '@nestjs/testing';
import { AgriEnterpriseController } from './agri-enterprise.controller';

describe('AgriEnterpriseController', () => {
  let controller: AgriEnterpriseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgriEnterpriseController],
    }).compile();

    controller = module.get<AgriEnterpriseController>(AgriEnterpriseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
