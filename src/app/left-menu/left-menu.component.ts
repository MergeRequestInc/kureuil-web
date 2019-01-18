import { Component, OnInit } from '@angular/core';
import {NewChannelComponent} from '../modals/new-channel/new-channel.component';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Channel} from '../model/channel';
import {ChannelService} from '../services-api/channel.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  channels: Channel[];
  channelsCopy: Channel[];

  constructor(
    private channelService: ChannelService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    //this.loadAllChannels();
  }

  createChannel() {
    const modalRef = this.modalService.open(NewChannelComponent);
    modalRef.componentInstance.channel = new Channel();
    modalRef.result.then((result) => {
      console.log(result);
      this.channels.push(result);
    }, (reason) => {
      console.log('Dismissed : ' + reason);
    });
    console.log(modalRef);
  }

  editChannel(channel: Channel) {
    const modalRef = this.modalService.open(NewChannelComponent);
    modalRef.componentInstance.channel = channel;
    modalRef.result.then( (result) => {
      console.log(result);
      this.loadAllChannels();
    }, (reason) => {
      console.log('Dismissed : ' + reason);
    });
  }

  deleteChannel(channel: Channel) {
    this.channelService.delete(channel.id).subscribe( () => this.loadAllChannels());
  }

  loadAllChannels() {
    this.channelService.findAll().subscribe( channels => {
      this.channels = channels;
      this.channelsCopy = channels;
    });
  }
}
