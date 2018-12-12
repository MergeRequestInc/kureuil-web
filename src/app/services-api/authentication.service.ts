import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

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
  login(user: User): Observable<User> {
    return this.http.post<User>('api/login', user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
  }
}
