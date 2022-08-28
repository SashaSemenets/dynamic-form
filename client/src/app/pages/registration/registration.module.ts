import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule } from '@angular/router';
import { RegistrationRoutes } from './registration.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from 'src/app/services/registration.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    DynamicFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RegistrationRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [RegistrationService]
})
export class RegistrationModule { }
