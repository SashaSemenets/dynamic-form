import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { RegistrationRequest } from 'src/models/models';
import { AppService } from '../app.service';
import { Response } from 'express';

import * as MOCKED_RESPONSE from '../json/form.json'; // or use const inside the controller function

@Controller('register-form')
export class RegisterFormController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRegisterForm(): any {
    return MOCKED_RESPONSE;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Res() res: Response): any {
    // console.log('res', res.req.body instanceof RegistrationRequest);
    res.status(HttpStatus.CREATED).send();
  }
}
