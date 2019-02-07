import { Injectable } from '@angular/core';
import {Link} from '../model/link';
import {SERVER_API_URL} from '../services-common/constants/app.constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient) { }

  /**
   * Create a link
   * @param link: link to create
   * @returns Observable<Link>: link created
   */
  create(link: Link): Observable<Link>  {
    return this.http.post<Link>(SERVER_API_URL + 'links', link);
  }

  /**
   * Update a link
   * @param link: link to update
   * @returns Observable<Link>: link updated
   */
  update (link: Link): Observable<Link>  {
    return this.http.put<Link>(SERVER_API_URL + 'links', link);
  }

  /**
   * Delete a link
   * @param id: id of the link to delete
   */
  delete (id: number) {
    return this.http.delete(SERVER_API_URL + 'links/' + id);
  }

  /**
   * Get a link by id
   * @param id: id of the link we are looking for
   * @returns Observable<Link>: link found
   */
  getById(id: number): Observable<Link> {
    return this.http.get<Link>( SERVER_API_URL + 'links/' + id);
  }

  /**
   * Get links by a query
   * @param query : query with which one we are looking for links
   * @returns Observable<Link[]>: list of links found
   */
  getByQuery(query: string): Observable<Link[]> {
    return this.http.get<Link[]>(SERVER_API_URL + 'links/query/' + query);
  }
}
