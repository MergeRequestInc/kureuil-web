import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Channel} from '../model/channel';

@Injectable({
  providedIn: 'root'
})
export class LinkChannelService {

  // Observable channel sources
  private _channelSource = new Subject<Channel>();

  channelSource$ = this._channelSource.asObservable();

  constructor() {}

  channelClicked(channel: Channel) {
    this._channelSource.next(channel);
  }
}
