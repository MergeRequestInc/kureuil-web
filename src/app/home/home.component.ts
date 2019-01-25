import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LinkService} from '../services-api/link.service';
import {Link} from '../model/link';

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
        this.links = [
          new Link(1, 'http://www.google.fr'),
          new Link(2, 'http://www.youtube.fr'),
          new Link(3, 'http://www.impot.gouv.fr'),
          new Link(4, 'http://www.angular.io'),
        ];
    }

    newLink() {
      this.router.navigate(['/newLink']);
    }

    loadQuery(query: string) {
      this.query = query;
      this.loadLinks();
    }

    loadLinks() {
      this.linkService.getByQuery(this.query).subscribe( links => this.links = links);
    }

    updateLink(linkId) {
      this.router.navigate(['/editLink', linkId]);
    }

    deleteLink(link: Link) {
      this.linkService.delete(link.id).subscribe(() => this.loadLinks());
    }
}
