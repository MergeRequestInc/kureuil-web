import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services-api/user.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
  model: User = new User();
  confirmPassword: string
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  changePwd(){
    this.loading = true;
    if (this.model.password === this.confirmPassword)
    {
      //changing password
    }else {
      this.messageService.add({severity: 'error', summary: 'Error',
      detail: 'Error: The two passwords don\'t match.'});
    }
    this.loading = false;
  }

}
