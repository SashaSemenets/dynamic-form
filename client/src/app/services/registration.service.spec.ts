import { getTestBed, TestBed } from '@angular/core/testing';
import { RegistrationRequest } from '../models/models';
import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpClientMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RegistrationService ]
    });
    service = TestBed.get(RegistrationService);
    httpClientMock = getTestBed().inject(HttpTestingController);
  });

  afterEach(() => {
    httpClientMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getForm should return value from observable via GET', (done: DoneFn) => {
    service.getForm().subscribe(fields => {
      expect(fields.length).toBe(6);
      done();
    });

    const req = httpClientMock.expectOne('http://localhost:3000/register-form');
    req.flush([{}, {}, {}, {}, {}, {}]);
  });

  it('#register should return value from observable', (done: DoneFn) => {
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
      done();
    });

    const req = httpClientMock.expectOne('http://localhost:3000/register-form');
    expect(req.request.method).toBe("POST");
    req.flush(dummyRegister);
  });

  it('register should return error', (done) => {
    const dummyRegister: RegistrationRequest = {
      first_name: '',
      middle_name: '',
      last_name: 'Doe',
      email: 'john@test.com',
      phone_number: '12345678',
      password: 'SecretPassword1',
    };

    const mockError = 'Bad Request' as any;

    service.register(dummyRegister).subscribe(() => {}, (thrownError) =>{
      expect(thrownError).toEqual(mockError);
      done();
    });

    const req = httpClientMock.expectOne('http://localhost:3000/register-form');
    req.error(mockError);
  });
});
