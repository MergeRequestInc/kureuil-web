import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {MessageService} from 'primeng/api';
import {UserService} from '../../services-api/user.service';

@Component({
  selector: 'app-forgotten-pwd',
  templateUrl: './forgotten-pwd.component.html',
  styleUrls: ['./forgotten-pwd.component.css']
})
export class ForgottenPwdComponent implements OnInit {
  model: User = new User();
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService) {  }

  ngOnInit() {
  }

  checkEmail() {
    this.userService.getByEmail(this.model.email).subscribe(
      (user: User) => {
        //Add Send Email function
        window.location.href = '/';
      }, (error) => {
        console.log(error);
        if (error.status === 404 || error.status === 500) {
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: 'An Error occured. Please contact an administrator.'
          });
        }else {
          this.messageService.add({severity: 'error', summary: 'error',
            detail: 'E mail not found. Please try again.' });
        }
        this.loading = false;
      }
    );
  }

}
