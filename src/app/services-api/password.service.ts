import { Injectable } from '@angular/core';
import {SERVER_API_URL} from '../services-common/constants/app.constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  changePassword(newPassword: string): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/account/change-password', newPassword);
  }
}
