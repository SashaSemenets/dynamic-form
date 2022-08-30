import { TestBed } from '@angular/core/testing';
import { RegistrationRequest } from '../models/models';
import { RegistrationService } from './registration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RegistrationService ]
    });
    service = TestBed.get(RegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getForm should return value from observable via GET', () => {
    service.getForm().subscribe(fields => {
      expect(fields.length).toBe(6);
    });
  });

  it('#register should return value from observable', () => {
    const dummyRegister: RegistrationRequest = {
      first_name: 'John',
      middle_name: '',
      last_name: 'Doe',
      email: 'john@test.com',
      phone_number: '12345678',
      password: 'SecretPassword1',
    };

    service.register(dummyRegister).subscribe(value => {
      expect(value).toEqual(dummyRegister);
    });
  });
});
