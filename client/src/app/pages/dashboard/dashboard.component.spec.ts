import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { RegistrationComponent } from '../registration/registration.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'registration', component: RegistrationComponent }
        ])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to url', async(inject([Router, Location], (router: Router, location: Location) => {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/registration');
    });
  })))
});
