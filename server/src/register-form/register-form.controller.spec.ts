import { Test, TestingModule } from '@nestjs/testing';
import { RegisterFormController } from './register-form.controller';

describe('RegisterFormController', () => {
  let controller: RegisterFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterFormController],
    }).compile();

    controller = module.get<RegisterFormController>(RegisterFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
