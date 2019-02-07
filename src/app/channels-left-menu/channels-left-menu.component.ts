import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ManageChannelComponent} from '../modals/manage-channel/manage-channel.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Channel} from '../model/channel';
import {ChannelService} from '../services-api/channel.service';
import {MessageService} from 'primeng/api';
import {isUndefined} from 'util';

/**
 * Component which displays the user's channels
 */
@Component({
  selector: 'app-left-menu',
  templateUrl: './channels-left-menu.component.html',
  styleUrls: ['./channels-left-menu.component.css']
})
export class ChannelsLeftMenuComponent implements OnInit {

  /** List of user's channels */
  channels: Channel[];
  /** Copy of the user's channels */
  channelsCopy: Channel[];
  /** Channel clicked */
  @Output() channelClicked: EventEmitter<Channel> = new EventEmitter<Channel>();
  /** Channel deleted */
  @Output() channelDeletedOrEdited: EventEmitter<any> = new EventEmitter<any>();

  /** Constructor */
  constructor(
    private channelService: ChannelService,
    private messageService: MessageService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // Emit the channel which for we have to retrieve links
    if (!isUndefined(this.channels) && this.channels.length > 0) {
      this.loadLinks(this.channels[0]);
    }
    console.log(this.channels);
    this.loadAllChannels();
  }

  /**
   * Open the modal to create a channel
   */
  createChannel() {
    const modalRef = this.modalService.open(ManageChannelComponent);
    modalRef.componentInstance.channel = new Channel();
    modalRef.result.then((result) => {
      console.log(result);
      this.loadAllChannels();
    }, (reason) => {
      console.log('Dismissed : ' + reason);
    });
    console.log(modalRef);
  }

  /**
   * Open the modal to edit a channel
   * @param channel : channel to edit
   */
  editChannel(channel: Channel) {
    const modalRef = this.modalService.open(ManageChannelComponent);
    console.log(channel);
    modalRef.componentInstance.channel = channel;
    modalRef.result.then( (result) => {
      console.log(result);
      this.channelDeletedOrEdited.emit();
      this.loadAllChannels();
    }, (reason) => {
      console.log('Dismissed : ' + reason);
    });
  }

  /**
   * Delete a channel
   * @param channel : channel to delete
   */
  deleteChannel(channel: Channel) {
    this.channelService.delete(channel.id).subscribe( () => {
      this.messageService.add({
        severity: 'success', summary: 'Success',
        detail: 'Channel deleted.'
      });
      this.channelDeletedOrEdited.emit();
      this.loadAllChannels();
    }, () => {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'An Error occured. Please contact an administrator.'
      });
    });
  }

  /**
   * Load all the connected user's channels
   */
  loadAllChannels() {
    this.channelService.loadChannelsByUser().subscribe( channels => {
      this.channels = channels;
      this.channelsCopy = channels;
    });
  }

  /**
   * Emit the channel id in order to load links linked to the channel
   * @param channel : channel which links we have to retrieve
   */
  loadLinks(channel) {
    this.channelClicked.emit(channel);
  }
}
