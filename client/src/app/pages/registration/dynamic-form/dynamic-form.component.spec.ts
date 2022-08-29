import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { DynamicFormComponent } from './dynamic-form.component';
import { RegistrationService } from 'src/app/services/registration.service';
import { Observable } from 'rxjs';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let registrationService: RegistrationService;
  let spy: jasmine.Spy;
  let mockFormData: Observable<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [RegistrationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    registrationService = fixture.debugElement.injector.get(RegistrationService);

    spy = spyOn(registrationService, 'register').and.returnValue(mockFormData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleType clicked change type', () => {
    expect(component.passwordType).toBe('password');
    component.toggleType();
    expect(component.passwordType).toBe('text');
    component.toggleType();
    expect(component.passwordType).toBe('password');
  });

  it('should call registrationService', () => {
    fixture.debugElement.query(By.css('.dynamic-form__button')).nativeElement.click();
    expect(spy.calls.any()).toBeTruthy();
  });
});
