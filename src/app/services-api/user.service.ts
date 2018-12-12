import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    /**
     * Get all the users (as admin)
     */
    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/api/users`);
    }

    /**
     * Get a user by id
     * @param id : user's id
     */
    getById(id: number) {
        return this.http.get(`${this.baseUrl}/api/users/` + id);
    }

    /**
     * Create a user
     * @param user: user to create
     */
    create(user: User) {
        return this.http.post(`${this.baseUrl}/api/users`, user);
        // return localStorage.setItem('isLoggedIn', 'true'); // A TESTER
    }

    /**
     * Update a user
     * @param user: user to update
     */
    update(user: User) {
        return this.http.put(`${this.baseUrl}/api/users`, user);
    }

    /**
     * Delete a user
     * @param id: user's id to delete
     */
    delete(id: number) {
        return this.http.delete(`${this.baseUrl}/api/users/` + id);
    }
}
