import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Channel} from '../model/channel';
import {SERVER_API_URL} from '../services-common/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  /**
   * Get all channels
   */
  findAll() {
    return this.http.get<Channel[]>( SERVER_API_URL + 'channels');
  }

  /**
   * Create a channel
   * @param channel : channel to create
   */
  create(channel: Channel) {
    return this.http.post(SERVER_API_URL + 'channels', channel);
  }

  /**
   * Update a channel
   * @param channel : channel to update
   */
  update (channel: Channel) {
    return this.http.put(SERVER_API_URL + 'channels', channel);
  }

  /**
   * Delete a channel
   * @param id : channel's id to delete
   */
  delete (id: number) {
    return this.http.delete(SERVER_API_URL + 'channels/' + id);
  }

  /**
   * Get user's channels
   */
  loadChannelsByUser() {
    return this.http.get<Channel[]>(SERVER_API_URL + 'channels/user');
  }
}
