import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Channel} from '../../model/channel';
import {isUndefined} from 'util';
import {ChannelService} from '../../services-api/channel.service';

@Component({
  selector: 'app-new-channel',
  templateUrl: './manage-channel.component.html',
  styleUrls: ['./manage-channel.component.css']
})
export class ManageChannelComponent implements OnInit {

  title: string;
  channel: Channel;
  channelCopy: Channel = new Channel();
  queryRule: RegExp = /^[a-z\d\-_#()\s]+$/i;
  errorText: string;

  constructor(
    private activeModal: NgbActiveModal,
    private channelService: ChannelService) { }

  ngOnInit() {
    this.defineTitle();
    this.channelCopy = Object.assign(this.channelCopy, this.channel);
  }

  checkQuery() {
    const querySize = this.channelCopy.query.length;
    let nbOpened = 0;
    let nbClosed = 0;
    let current: string;
    for (let i = 0; i < querySize; ++i) {
      if (this.channelCopy.query.charAt(i) === '(') {
        current = '(';
        ++nbOpened;
      } else if (this.channelCopy.query.charAt(i) === ')') {
        current = ')';
        ++nbClosed;
      }
      if (current === ')' && nbOpened === 0) {
        this.errorText = '"(" is required for every ")".';
        return false;
      }
    }
    if (nbOpened !== nbClosed) {
      this.errorText = 'Parenthesis missing';
      return false;
    }
    if (current === '(') {
      this.errorText = '")" is required for every "(".';
      return false;
    }
    return true;
  }

  save() {
    if (this.checkQuery() === false) {
      return;
    }
    this.channel = this.channelCopy;
    if (isUndefined(this.channel.id)) {
      console.log('save');
      this.channelService.create(this.channel).subscribe( (channel) => {
        this.activeModal.close(channel);
      }, () => {
        console.log('Error: can not create channel');
      });
    } else {
      console.log('update');
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
    if (isUndefined(this.channel) || isUndefined(this.channel.id)) {
      this.title = 'Channel creation';
    } else {
      this.title = 'Channel modification';
    }
  }

}
