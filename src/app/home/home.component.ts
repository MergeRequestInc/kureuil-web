import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LinkService} from '../services-api/link.service';
import {Link} from '../model/link';
import {Channel} from '../model/channel';
import {ChannelService} from '../services-api/channel.service';

/**
 * Home component
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  returnUrl: string;
  query: string;
  isLoggedIn: Boolean = localStorage.getItem('isLoggedIn') != null;
  links: Link[];
  channelTitle: string;
  selectedChannel: Channel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private linkService: LinkService,
    private channelService: ChannelService
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loadLinksOfFirstChannel();
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
    this.linkService.getByQuery(this.query).subscribe( links => this.links = links);
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
      }
    });
  }

  reloadLinks() {
    this.loadLinksOfFirstChannel();
  }
}
