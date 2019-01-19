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
    this.channels = [
      new Channel(1, 'channel 1', 'query 1'),
      new Channel(2, 'channel 2', 'query 2'),
      new Channel(3, 'channel 3', 'query 3'),
      new Channel(4, 'channel 4', 'query 3'),
      new Channel(5, 'channel 5', 'query 3'),
      new Channel(6, 'channel 6', 'query 3'),
      new Channel(7, 'channel 7', 'query 3'),
      new Channel(8, 'channel 8', 'query 3'),
      new Channel(9, 'channel 9', 'query 3'),
      new Channel(10, 'channel 10', 'query 3'),
      new Channel(11, 'channel 11', 'query 3'),
      new Channel(12, 'channel 12', 'query 3'),
      new Channel(13, 'channel 13', 'query 3'),
      new Channel(14, 'channel 14', 'query 3'),
      new Channel(15, 'channel 15', 'query 3'),
      new Channel(16, 'channel 16', 'query 3'),
      new Channel(17, 'channel 17', 'query 3')
    ];
    console.log(this.channels);
    // this.loadAllChannels();
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
