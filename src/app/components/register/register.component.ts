import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { UserPost } from '../../model/user-post';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  siteKey = environment.recaptcha.siteKey;

  token:string | undefined;

  thermsOfUseAgreed: boolean;
  displayMaxTherms: boolean;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { 
    this.thermsOfUseAgreed = false;
    this.displayMaxTherms = false;

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: [''],
      nick: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator('password')]]
    }
    );
  }

  enableSubmit(form: FormGroupDirective):boolean{
    return form.invalid! || !form.touched! || !this.thermsOfUseAgreed ;
  }

  submitRegistrationForm(form: FormGroupDirective): void {
    if (form.invalid) {
      for (const control of Object.keys(form.control)) {
        form.control.markAsTouched();
      }
      return;
    }
    this.authService.register({
      name: this.name?.value,
      surname: this.surname?.value,
      nick: this.nick?.value,
      email: this.email?.value,
      password: this.password?.value,
      repeatPassword: this.confirmPassword?.value
    })
  }

  showMaximizableDialog() {
    this.displayMaxTherms = true;
  }

  toggleThermsAgreed(){
    this.thermsOfUseAgreed = !this.thermsOfUseAgreed;
  }

  ngOnInit(): void {}

  get name(){
    return this.registerForm.get("name");
  }

  get surname(){
    return this.registerForm.get("surname");
  }

  get nick(){
    return this.registerForm.get("nick");
  }

  get email(){
    return this.registerForm.get("email");
  }

  get password(){
    return this.registerForm.get("password");
  }

  get confirmPassword(){
    return this.registerForm.get("confirmPassword");
  }
}

export function confirmPasswordValidator(password: string) {
  return (control: FormControl) => {
    
    if (!control || !control.parent) {
      return null;
    }
    return (control.parent.get(password)?.value === control.value)? null : {mismatch: true};
  };
}
