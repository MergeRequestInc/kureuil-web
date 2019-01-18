import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Channel} from "../model/channel";
import {SERVER_API_URL} from "../services-common/constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  findAll()
  {
    return this.http.get<Channel[]>( SERVER_API_URL + 'channels');
  }

  create(channel: Channel)
  {
    return this.http.post(SERVER_API_URL + 'channels', channel);
  }

  update (channel: Channel)
  {
    return this.http.post(SERVER_API_URL + 'channels', channel);
  }


  delete (id: number)
  {
    return this.http.delete(SERVER_API_URL + 'channels/' + id);
  }

}
