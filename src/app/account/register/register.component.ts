import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {User} from '../../model/user';
import {UserService} from '../../services-api/user.service';

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
    private userService: UserService,
    private messageService: MessageService) { }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Registration successful'});
          this.loading = false;
          this.router.navigate(['login']);
        },
        () => {
          this.messageService.add({severity: 'error', summary: 'Error',
            detail: 'Registration impossible. Please contact an administrator'});
          this.loading = false;
        });
  }
}
