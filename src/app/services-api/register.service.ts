import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../services-common/constants/app.constants';

/**
 * Service linked to operations linked to registration
 */
@Injectable({ providedIn: 'root' })
export class RegisterService {
    constructor(private http: HttpClient) {}

    save(name: string, email: string, password: string): Observable<any> {
      const data = {name: name, email: email, password: password};
        return this.http.post(SERVER_API_URL + 'user/register', data);
    }
}
