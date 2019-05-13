import {Component, OnDestroy, OnInit} from '@angular/core';
import {LinkChannelService} from '../link-channel.service';
import {Subscription} from 'rxjs';
import {Channel} from '../../model/channel';
import {Link} from '../../model/link';
import {Router} from '@angular/router';
import {LinkService} from '../../services-api/link.service';
import {ChannelService} from '../../services-api/channel.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  encodeQuery: string;
  query: string;
  isLoggedIn: Boolean = localStorage.getItem('isLoggedIn') != null;
  links: Link[];
  channelTitle: string;
  selectedChannel: Channel;

  constructor(
    private linkChannelInteraction: LinkChannelService,
    private router: Router,
    private linkService: LinkService,
    private channelService: ChannelService
  ) { }

  ngOnInit() {
    this.loadLinksOfFirstChannel();
    this.subscription = this.linkChannelInteraction.channelSource$.subscribe(channel => {
      console.log(channel);
      if (isNullOrUndefined(channel)) {
        this.loadLinksOfFirstChannel();
      } else {
        this.loadLinksLinkedToChannel(channel);
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  /**
   * Redirect to the link creation page
   */
  newLink() {
    this.router.navigate(['/newLink']);
  }

  /**
   * Update the query saved in the component and reload the assoaciated links
   * @param query : query to consider
   */
  loadQuery(query: string) {
    this.query = query;
    this.loadLinks();
  }

  /**
   * Load the links linked to a query
   */
  loadLinks() {
    this.encodeQuery = this.query.replace('#', '%23');
    this.linkService.getByQuery(this.encodeQuery).subscribe( links => this.links = links);
  }

  /**
   * Update a link
   * @param linkId : link's id to update
   */
  updateLink(linkId) {
    this.router.navigate(['/editLink', linkId]);
  }

  /**
   * Delete a link
   * @param link : link to delete
   */
  deleteLink(link: Link) {
    this.linkService.delete(link.id).subscribe(() => this.loadLinks());
  }

  /**
   * Load Links linked to the channel clicked in left menu
   * @param channelClicked : channel clicked
   */
  loadLinksLinkedToChannel(channelClicked: Channel) {
    console.log('loadLinks');
    this.channelTitle = channelClicked.name;
    this.selectedChannel = channelClicked;
    this.loadQuery(channelClicked.query);
  }

  /**
   * Load the links associated to the first channel of the connected user
   */
  private loadLinksOfFirstChannel() {
    this.channelService.loadChannelsByUser().subscribe( channels => {
      if (channels.length > 0) {
        this.selectedChannel = channels[0];
        this.loadLinksLinkedToChannel(this.selectedChannel);
      } else {
        this.channelTitle = '';
        this.links = [];
      }
    });
  }
}
