import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {User} from '../../model/user';
import {RegisterService} from '../../services-api/register.service';

/**
 * Component for registration
 */
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
    private registerService: RegisterService,
    private messageService: MessageService) { }

  /**
   * Registration of the user
   */
  register() {
    this.loading = true;
    this.registerService.save(this.model.name, this.model.email, this.model.password)
      .subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Registration successful'});
          this.loading = false;
          this.router.navigate(['login']);
        },
        (error) => {
          if (error.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error',
              detail: 'User already exists or an error occured'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Error',
              detail: 'Registration impossible. Please contact an administrator'});
          }
          this.loading = false;
        });
  }
}
