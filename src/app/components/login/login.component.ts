import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;


  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  get f() { return this.loginForm.controls; }

  login(email, password, confirm_password) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(email, password)
      .subscribe(
        () => {
          this.router.navigateByUrl('/profile');
        },
        (err: HttpErrorResponse) => {
          alert(`${err.error.error}`);
        }
      );
  }


  // logout() {
  // 	this.authService.logout()
  // 	.subscribe(
  // 		() => {
  // 			this.router.navigateByUrl('/login');
  // 		});
  // }

}
