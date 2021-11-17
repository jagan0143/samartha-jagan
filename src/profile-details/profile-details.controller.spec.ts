import { Test, TestingModule } from '@nestjs/testing';
import { ProfileDetailsController } from './profile-details.controller';

describe('ProfileDetailsController', () => {
  let controller: ProfileDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileDetailsController],
    }).compile();

    controller = module.get<ProfileDetailsController>(ProfileDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
