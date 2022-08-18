import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email(){
    return this.loginForm.get("email");
  }

  get password(){
    return this.loginForm.get("password");
  }

  enableSubmit(form: FormGroupDirective): boolean {
    return form.invalid! || !form.touched!
  }

  attemptLogin(){
    if(!this.email?.valid){
      this.messageService.add({
        severity: 'error',
        summary: 'Fill in email'
      });
    }

    if(!this.password?.valid){
      this.messageService.add({
        severity: 'error',
        summary: 'Fill in password'
      });
    }
    
    if(this.email?.valid && this.password?.valid){
      this.authService.login({
        username: this.email.value,
        password: this.password.value
      });
    }
  }

  ngOnInit(): void {}

}
