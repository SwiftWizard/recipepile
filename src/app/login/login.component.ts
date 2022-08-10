import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../model/authentication-request';
import { DataWithMessages } from '../model/data-with-messages';
import { UserSlim } from '../model/user-slim';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authReq: AuthenticationRequest = <AuthenticationRequest>{};

  constructor(private authService: AuthService, private messageService: MessageService) { 
  }

  attemptLogin(){
    if(!this.authReq.username){
      this.messageService.add({
        severity: 'error',
        summary: 'Email field cannot be empty'
      });
    }

    if(!this.authReq.password){
      this.messageService.add({
        severity: 'error',
        summary: 'Password field cannot be empty'
      });
    }
    
    if(this.authReq.username && this.authReq.password){
      this.authService.login(this.authReq);
    }
  }

  ngOnInit(): void {}

}
