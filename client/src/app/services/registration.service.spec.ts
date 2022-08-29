import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(RegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getForm should return value from observable',
    (done: DoneFn) => {
    service.getForm().subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('#register should return value from observable',
    (done: DoneFn) => {
    service.register({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_number: ''
    }).subscribe(value => {
      console.log('value', value)
      expect(value).toBeNull();
      done();
    });
  });
});
