import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tag} from '../model/tag';
import {SERVER_API_URL} from '../services-common/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }

  create(tag: Tag) {
    return this.http.post(SERVER_API_URL + 'tags', tag);
  }

  getByLinkId(linkId: number) {
    return this.http.get<Tag[]>( SERVER_API_URL + 'tags/' + linkId);
  }

  getAllTags() {
    return this.http.get<Tag[]>(SERVER_API_URL + 'tags');
  }
}

