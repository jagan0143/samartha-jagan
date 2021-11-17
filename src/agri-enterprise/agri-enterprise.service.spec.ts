import { Test, TestingModule } from '@nestjs/testing';
import { AgriEnterpriseService } from './agri-enterprise.service';

describe('AgriEnterpriseService', () => {
  let service: AgriEnterpriseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgriEnterpriseService],
    }).compile();

    service = module.get<AgriEnterpriseService>(AgriEnterpriseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
