import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { DynamicFormComponent } from './dynamic-form.component';
import { RegistrationService } from 'src/app/services/registration.service';
import { Observable } from 'rxjs';
import { SimpleChange } from '@angular/core';
import { RegistrationField } from 'src/app/models/models';
import { Location } from '@angular/common';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { Router } from '@angular/router';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let registrationService: RegistrationService;
  let spy: jasmine.Spy;
  let mockFormData: Observable<any>;
  let mockData: RegistrationField[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'welcome', component: WelcomeComponent }
        ])
      ],
      providers: [RegistrationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    registrationService = fixture.debugElement.injector.get(RegistrationService);
    component.showErrorMessage$.next(true);
    mockData = [
      {
        type: 'text',
        name: 'first_name',
        label: 'First Name',
        required: true,
        validations: []
      },
      {
        type: 'text',
        name: 'last_name',
        label: 'Last Name',
        required: false,
        validations: [
          {
            name: 'maxlength',
            message: 'Must be less than 4 characters.',
            value: 4
          }
        ]
      },
      {
        type: 'text',
        name: 'middle_name',
        label: 'Middle Name',
        required: false,
        validations: [
          {
            name: 'minlength',
            message: 'Must be not less than 4 characters.',
            value: 4
          }
        ]
      },
      {
        type: 'phone',
        name: 'phone_number',
        label: 'Mobile number',
        required: false,
        validations: [
          {
            name: 'regex',
            message: 'Only numbers are allowed.',
            value: '^[0-9]+$'
          }
        ]
      },
      {
        type: 'password',
        name: 'password',
        label: 'Password',
        required: true,
        validations: [
          {
            name: 'regex',
            message: '1 or more numbers.',
            value: '^.*[0-9].*$',
          },
          {
            name: 'regex',
            message: '1 or more lower case letters.',
            value: '^.*[a-z].*$',
          },
          {
            name: 'regex',
            message: '1 or more upper case letters.',
            value: '^.*[A-Z].*$',
          },
        ],
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email',
        required: true,
        validations: []
      },
    ];

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

  it('should not display form if formData empty', () => {
    component.formData = [];
      
    component.ngOnChanges({
      formData: new SimpleChange([], component.formData, true)
    });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.dynamic-form__field'))).toBeNull();
  });

  it('should create form', () => {
    const dataValue = {
      first_name: '',
      last_name: '',
      middle_name: '',
      phone_number: '',
      password: '',
      email: '',
    };

    (component as any).createForm(mockData);

    expect(component.form.value).toEqual(dataValue);

    expect(component.form.get('first_name')?.errors).toEqual({ required: true });

    expect(component.form.get('last_name')?.errors).toBeNull();

    component.form.get('last_name')?.patchValue('12345');
    expect(component.form.get('last_name')?.errors).toEqual({ maxlength: { requiredLength: 4, actualLength: 5 }});

    component.form.get('middle_name')?.patchValue('1');
    expect(component.form.get('middle_name')?.errors).toEqual({ minlength: { requiredLength: 4, actualLength: 1 }});

    component.form.get('phone_number')?.patchValue('ab');
    expect(component.form.get('phone_number')?.errors).toEqual({ pattern: { requiredPattern: '^[0-9]+$', actualValue: 'ab'} })
  });

  it('should return error message', () => {
    (component as any).createForm(mockData);
    component.formData = mockData;

    const firstnameErrorMessage = component.getErrorMessage('first_name', []);
    expect(firstnameErrorMessage).toBe('First Name is required.');

    component.form.get('last_name')?.patchValue('12345');
    const lastnameErrorMessage = component.getErrorMessage('last_name', [
      {
        name: 'maxlength',
        message: 'Must be less than 4 characters.',
        value: 4
      }
    ]);
    expect(lastnameErrorMessage).toBe('Must be less than 4 characters.');

    component.form.get('middle_name')?.patchValue('1');
    const middlenameErrorMessage = component.getErrorMessage('middle_name', [
      {
        name: 'minlength',
        message: 'Must be not less than 4 characters.',
        value: 4
      }
    ]);
    expect(middlenameErrorMessage).toBe('Must be not less than 4 characters.');

    component.form.get('phone_number')?.patchValue('ab');
    const phoneErrorMessage = component.getErrorMessage('phone_number', [
      {
        name: 'regex',
        message: 'Only numbers are allowed.',
        value: '^[0-9]+$'
      }
    ]);
    expect(phoneErrorMessage).toBe('Only numbers are allowed.');

    const emptyErrorMessage = component.getErrorMessage('middle_name', undefined);
    expect(emptyErrorMessage).toBe('');
  })

  it('check getPatternErrorMessage functioon', () => {
    (component as any).createForm(mockData);
    const errorMsg = (component as any).getPatternErrorMessage([
      {
        name: 'regex',
        message: '1 or more numbers.',
        value: '^.*[0-9].*$',
      },
      {
        name: 'regex',
        message: '1 or more lower case letters.',
        value: '^.*[a-z].*$',
      },
      {
        name: 'regex',
        message: '1 or more upper case letters.',
        value: '^.*[A-Z].*$',
      },
    ], 'password');

    expect(errorMsg).toBe('1 or more numbers.');

    const emptyErrorMessage = (component as any).getPatternErrorMessage(undefined, 'password');
    expect(emptyErrorMessage).toBe('');
  });

  it('check register clicked', () => {
    (component as any).createForm(mockData);
    component.form.get('first_name')?.patchValue('John');
    component.form.get('last_name')?.patchValue('Doe');
    component.form.get('middle_name')?.patchValue('');
    component.form.get('phone_number')?.patchValue('12345678');
    component.form.get('password')?.patchValue('SecretPassword1');
    component.form.get('email')?.patchValue('john@test.com');

    const spySubscribable = spyOn(component, 'register');
    component.register();
    expect(spySubscribable).toHaveBeenCalled();
  });

  it('navigate to welcome', async(inject([Router, Location], (router: Router, location: Location) => {
    (component as any).navigateToWelcome();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/welcome');
    });
  })));
});
