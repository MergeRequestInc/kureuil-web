import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../services-common/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    /**
     * Get all the users (as admin)
     */
    getAll(): Observable<User[]> {
        return this.http.get<User[]>(SERVER_API_URL + `users`);
    }

    /**
     * Get a user by id
     * @param id : user's id
     */
    getById(id: number) {
        return this.http.get(SERVER_API_URL + `users/` + id);
    }

    /**
     * Create a user
     * @param user: user to create
     */
    create(user: User) {
        return this.http.post(SERVER_API_URL + `users`, user);
        // return localStorage.setItem('isLoggedIn', 'true'); // A TESTER
    }

    /**
     * Update a user
     * @param user: user to update
     */
    update(user: User) {
        return this.http.put(SERVER_API_URL + `users`, user);
    }

    /**
     * Delete a user
     * @param id: user's id to delete
     */
    delete(id: number) {
        return this.http.delete(SERVER_API_URL + `users/` + id);
    }
}
