import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services-api/authentication.service';
import {User} from '../model/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: User = new User();
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    /**
     * Login
     */
    login() {
        this.loading = true;
        this.authenticationService.login(this.model)
            .subscribe(
                (user: User) => {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('idUserConnected', JSON.stringify(user.id));
                    window.location.href = '/';
                },
                () => {
                    // TODO this.alertService.error('Login impossible. Please verify your login and password.');
                    this.loading = false;
                });
    }
}
