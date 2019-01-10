import { Injectable } from '@angular/core';
import {SERVER_API_URL} from '../services-common/constants/app.constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

/**
 * Service for operations linked to user's password
 */
@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  /**
   * Function to change the password
   * @param newPassword: new password for the connected user
   */
  changePassword(newPassword: string): Observable<any> {
    return this.http.post(SERVER_API_URL + 'account/change-password', newPassword);
  }

  /**
   * Send to the server a request to reset the password
   * @param email: email linked to the user trying to recover a password
   */
  resetPassword(email: string): Observable<any> {
    return this.http.post(SERVER_API_URL + 'account/reset-password/init', email);
  }
}
