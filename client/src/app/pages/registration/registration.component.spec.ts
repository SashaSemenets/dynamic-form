import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { RegistrationField } from 'src/app/models/models';
import { RegistrationService } from 'src/app/services/registration.service';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registrationService: RegistrationService;
  let spy: jasmine.Spy;
  let mockFormData: Observable<RegistrationField[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ RegistrationComponent ],
      providers: [RegistrationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    registrationService = fixture.debugElement.injector.get(RegistrationService);

    spy = spyOn(registrationService, 'getForm').and.returnValue(mockFormData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call registrationService', () => {
    (component as any).getForm();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set formData$', () => {
    (component as any).getForm();
    expect(component.formData$).toEqual(mockFormData);
  });
});
