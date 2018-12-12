import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/user';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../services-api/AuthenticationService';

/**
 * Component for log in the app
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   *  User trying to connect or create an account
   */
  user: User;

  @ViewChild('loginForm') form: NgForm;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  /**
   * User is trying to log in
   * @param form : form for log
   */
  save(form: NgForm) {
    console.log(this.user);
    this.authenticationService.login(this.user).subscribe((userConnected) => {
      this.user = userConnected;
      localStorage.setItem('isLoggedIn', 'true');
    });
  }
}
