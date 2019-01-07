import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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
  isLoggedIn: Boolean = localStorage.getItem('isLoggedIn') != null;

  constructor(
    private route: ActivatedRoute
  ) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
}
