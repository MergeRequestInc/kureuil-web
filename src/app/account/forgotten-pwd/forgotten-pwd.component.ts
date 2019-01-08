import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {MessageService} from 'primeng/api';
import {PasswordService} from '../../services-api/password.service';

/**
 * Component for retrieving a lost password
 */
@Component({
  selector: 'app-forgotten-pwd',
  templateUrl: './forgotten-pwd.component.html',
  styleUrls: ['./forgotten-pwd.component.css']
})
export class ForgottenPwdComponent implements OnInit {
  model: User = new User();
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passwordService: PasswordService,
    private messageService: MessageService) {  }

  ngOnInit() {
  }

  /**
   * Check if the email of the form is linked to an existing user
   */
  checkEmail() {
    this.passwordService.resetPassword(this.model.email).subscribe(
      () => {
        this.messageService.add({severity: 'success', summary: 'Success',
          detail: 'A new password has been sent. Please check your mailbox.' });
      }, (error) => {
        console.log(error);
        if (error.status === 404 || error.status === 500) {
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: 'An Error occured. Please contact an administrator.'
          });
        } else {
          this.messageService.add({severity: 'error', summary: 'error',
            detail: 'E mail not found. Please try again.' });
        }
        this.loading = false;
      }
    );
  }
}
