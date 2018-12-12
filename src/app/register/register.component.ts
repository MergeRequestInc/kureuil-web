import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services-api/user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    model: User = new User;
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                () => {
                    // TODO this.alertService.success('Registration successful', true);
                    this.router.navigate(['login']);
                },
                () => {
                    // TODO this.alertService.error('Registration impossible. Please contact an administrator.');
                    this.loading = false;
                });
    }
}
