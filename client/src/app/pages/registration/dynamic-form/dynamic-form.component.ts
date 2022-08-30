import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FieldValidation, RegistrationField } from 'src/app/models/models';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnChanges {
  @Input() formData: RegistrationField[] | null = [];

  public form: FormGroup = this.fb.group({});
  public passwordType = 'password';
  public errorMessage: string;
  public showErrorMessage$ = new BehaviorSubject(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly registrationService: RegistrationService,
    private readonly router: Router,
  ) {
    this.errorMessage = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.formData.currentValue) {
      this.createForm(this.formData as RegistrationField[]);
    }
  }

  private createForm(controls: RegistrationField[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      const { name, required, validations } = control;

      required ? validatorsToAdd.push(Validators.required) : null;

      if (!!validations) {
        for (const validator of validations) {
          const { name, value } = validator;
          switch (name) {
            case 'maxlength':
              validatorsToAdd.push(Validators.maxLength(Number(value)));
              break;
            case 'minlength':
              validatorsToAdd.push(Validators.minLength(Number(value)));
              break;
            case 'regex':
              validatorsToAdd.push(Validators.pattern(`${value}`));
              break;
            default:
              break;
          }
        }
      }

      this.form.addControl(
        name,
        this.fb.control('', validatorsToAdd)
      );
    }
  }

  public toggleType(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  public getErrorMessage(key: string, validations: FieldValidation[] | undefined): string {
    let errorMessage = '';
    const { errors } = this.form.controls[key];

    if (!!validations && !!errors) {
      top:
      for (const errorProp of Object.keys(errors)) {
        switch (errorProp) {
          case 'maxlength':
            errorMessage = validations?.find(item => item.name === 'maxlength')?.message as string;
            break top;
          case 'minlength':
            errorMessage = validations?.find(item => item.name === 'minlength')?.message as string;
            break top;
          case 'pattern':
            errorMessage = this.getPatternErrorMessage(validations, key);
            break top;
          case 'required':
            const label = this.formData?.find(item => item.name === key)?.label;
            errorMessage = `${label} is required.`;
            break top;
          default:
            break top;
        }
      }
    }
    return errorMessage;
  }

  private getPatternErrorMessage(validations: FieldValidation[] | undefined, key: string): string {
    if (!!validations) {
      const regexArr = validations?.filter(item => item.name === 'regex');

      if (regexArr?.length > 1) {
        const messageArr = [];

        for (const pattern of regexArr) {
          const { message, value } = pattern;
          const controlValue = this.form.controls[key]?.value;
          const regexp = new RegExp(value as string, 'u');

          regexp.test(controlValue) ? null : messageArr.push(message);
        }

        return messageArr[0];
      } else {
        return regexArr[0].message;
      }
    }
    return '';
  }

  public register(): void {
    const { value } = this.form;

    this.registrationService.register(value)
      .subscribe(
        () => this.navigateToWelcome(),
        (error) => this.handleError(error)
      );
  }

  private navigateToWelcome(): void {
    this.router.navigate(['/welcome']);
  }

  private handleError(error: any): void {
    const { message } = error;
    this.showErrorMessage$.next(true);
    this.errorMessage = message[0];
    setTimeout(() => this.onHideToastr(), 3000);
  }

  public onHideToastr(): void {
    this.showErrorMessage$.next(false);
  }
}
