import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  returnURL: string;
  isLoggedIn: Boolean = localStorage.getItem('isLoggedIn') != null;
  isAdmin: Boolean = localStorage.getItem('isAdmin') != null;
  idUserConnected = localStorage.getItem('idUserConnected');

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  }
}
