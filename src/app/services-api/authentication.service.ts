import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../services-common/constants/app.constants';
import {map} from 'rxjs/operators';

/**
 * Authentication service
 */
@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  /**
   * User is logging in
   */
  login(email: string, password: string): Observable<any> {
    const data = {email: email, password: password};
    return this.http.post(SERVER_API_URL + 'user/login', data, {responseType: 'text'});
  }

  /**
   * Disconnect the current user
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
  }

  /**
   * Check if current user is logged in
   */
  isLogin() {
    return !!localStorage.getItem('isLoggedIn');
  }
}
