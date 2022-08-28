import { Component } from '@angular/core';
import { RegistrationField } from 'src/app/models/models';
import { RegistrationService } from 'src/app/services/registration.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  formData$!: Observable<RegistrationField[]>;

  constructor(
    private readonly registrationService: RegistrationService,
  ) {
    this.getForm();
  }

  private getForm(): void {
    this.formData$ = this.registrationService.getForm();
  }
}
