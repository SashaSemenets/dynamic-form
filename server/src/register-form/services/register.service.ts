import { Injectable } from '@nestjs/common';

import * as MOCKED_RESPONSE from '../../json/form.json'; // or use const inside the controller function

@Injectable()
export class RegisterService {
  public getRegisterForm(): any {
    return MOCKED_RESPONSE;
  }
}
