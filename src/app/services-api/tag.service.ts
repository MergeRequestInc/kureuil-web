import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tag} from '../model/tag';
import {SERVER_API_URL} from '../services-common/constants/app.constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }

  /**
   * Create a tag
   * @param tag: tag to create
   * @returns Observable<Tag>: tag created
   */
  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(SERVER_API_URL + 'tags', tag);
  }

  /**
   * Get tags by link id
   * @param linkId: id of the link
   * @returns Observable<Tag[]>: list of tags found
   */
  getByLinkId(linkId: number): Observable<Tag[]> {
    return this.http.get<Tag[]>( SERVER_API_URL + 'tags/' + linkId);
  }

  /**
   * Get all tags
   * @returns Observable<Tag[]>: list of all tags
   */
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(SERVER_API_URL + 'tags');
  }
}

