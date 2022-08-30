import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegistrationRequest } from '../../models/models';
import { RegisterService } from '../services/register.service';

@Controller('register-form')
export class RegisterFormController {
  constructor(private readonly registerService: RegisterService) {}

  @Get()
  getRegisterForm(): any {
    return this.registerService.getRegisterForm();
  }

  @Post()
  async registerUser(@Body() registration: RegistrationRequest) {
    return { message: 'This action adds a new user' };
  }
}
