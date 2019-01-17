import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Channel} from '../../model/channel';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.css']
})
export class NewChannelComponent implements OnInit {

  channel: Channel;
  channelCopy: Channel = new Channel();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.channelCopy = Object.assign(this.channelCopy, this.channel);
  }

  save() {
    console.log('save');
    this.channel = this.channelCopy;
    this.activeModal.close(this.channel);
  }

  close() {
    console.log('close');
    this.activeModal.dismiss('Cross click');
  }

}
