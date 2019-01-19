import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Channel} from '../../model/channel';
import {isUndefined} from 'util';
import {ChannelService} from '../../services-api/channel.service';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.css']
})
export class NewChannelComponent implements OnInit {

  title: string;
  channel: Channel;
  channelCopy: Channel = new Channel();

  constructor(
    private activeModal: NgbActiveModal,
    private channelService: ChannelService) { }

  ngOnInit() {
    this.defineTitle();
    this.channelCopy = Object.assign(this.channelCopy, this.channel);
  }

  save() {
    console.log('save');
    this.channel = this.channelCopy;
    if (isUndefined(this.channel.id)) {
      this.channelService.create(this.channel).subscribe( (channel) => {
        this.activeModal.close(channel);
      }, () => {
        console.log('Error: can not create channel');
      });
    } else {
      this.channelService.update(this.channel).subscribe( (channel) => {
        this.activeModal.close(channel);
      }, () => {
        console.log('Error: can not update channel');
      });
    }
  }

  close() {
    console.log('close');
    this.activeModal.dismiss('Cross click');
  }

  defineTitle() {
    if (isUndefined(this.channel.id)) {
      this.title = 'New Channel';
    } else {
      this.title = 'Channel Update';
    }
  }

}
