import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationField, RegistrationRequest } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private url: string = 'http://localhost:3000/register-form';

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getForm(): Observable<RegistrationField[]> {
    return this.http.get<RegistrationField[]>(this.url);
  }

  public register(data: RegistrationRequest): Observable<any> {
    return this.http.post<RegistrationRequest>(this.url, data);
  }
}
