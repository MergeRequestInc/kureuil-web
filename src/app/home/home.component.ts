import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LinkService} from '../services-api/link.service';
import {Link} from '../model/link';
import {Channel} from '../model/channel';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private linkService: LinkService
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // TODO load links of the first channel
    this.links = [
      new Link(1, 'http://www.google.fr'),
      new Link(2, 'http://www.youtube.fr'),
      new Link(3, 'http://www.impot.gouv.fr'),
      new Link(4, 'http://www.angular.io'),
    ];
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
    this.loadQuery(channelClicked.query);
  }
}
