import { Injectable } from '@angular/core';
import {Link} from '../model/link';
import {SERVER_API_URL} from '../services-common/constants/app.constants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient) { }

  create(link: Link) {
    return this.http.post(SERVER_API_URL + 'links', link);
  }

  update (link: Link) {
    return this.http.put(SERVER_API_URL + 'links', link);
  }

  delete (id: number) {
    return this.http.delete(SERVER_API_URL + 'links/' + id);
  }

  getById(id: number) {
    return this.http.get<Link>( SERVER_API_URL + 'links/' + id);
  }

  getByQuery(query: string) {
    return this.http.get<Link[]>(SERVER_API_URL + 'links/' + query);
  }
}