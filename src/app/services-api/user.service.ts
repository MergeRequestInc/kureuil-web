import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../services-common/constants/app.constants';

/**
 * Service for operations linked to User entity
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    /**
     * Get all the users (as admin)
     * @returns Observable<User[]>: all users
     */
    getAll(): Observable<User[]> {
        return this.http.get<User[]>(SERVER_API_URL + `users`);
    }

    /**
     * Get a user by id
     * @param id : user's id
     * @returns Observable<User>: user found
     */
    getById(id: number): Observable<User> {
        return this.http.get<User>(SERVER_API_URL + `users/` + id);
    }

  /**
   * Get a user by email
   * @param email: user's email
   * @returns Observable<User>: user found
   */
  getByEmail(email: string): Observable<User> {
      return this.http.get<User>(SERVER_API_URL + 'users/' + email);
    }

    /**
     * Create a user
     * @param user: user to create
     * @returns Observable<User>: user created
     */
    create(user: User): Observable<User> {
        return this.http.post<User>(SERVER_API_URL + `users`, user);
    }

    /**
     * Update a user
     * @param user: user to update
     * @returns Observable<User>: user updated
     */
    update(user: User): Observable<User>  {
        return this.http.put<User>(SERVER_API_URL + `users`, user);
    }

    /**
     * Delete a user
     * @param id: user's id to delete
     */
    delete(id: number) {
        return this.http.delete(SERVER_API_URL + `users/` + id);
    }
}
