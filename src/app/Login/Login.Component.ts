import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

//import { AlertService, AuthenticationService } from '../_services';


@Component(
  { templateUrl: 'Login.component.html' }
)
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  unauthorized = false;
  submitted = false;
  returnUrl: string;
  result: string;
  
  public baseURL = "http://localhost:49438/api/";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  private authenticationService: LoginService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      dob: ['', Validators.required ]
    });

   // // reset login status
   //// this.authenticationService.logout();

   // // get return url from route parameters or default to '/'
   // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

     //stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    var credentials = {
      "username": this.f.username.value,
      "password": this.f.password.value,
      "dob": this.datePipe.transform(this.f.dob.value, "dd-MM-yyyy")

    };

    this.loading = true;
    this.authenticationService.Login(this.baseURL + "User/Login", credentials)
      .pipe(first())
      .subscribe(
      data => {
      
        if (!data) {
          this.loading = false;
         
        }
        else {
         
          sessionStorage.setItem('Token', String(data));
          this.router.navigate([this.returnUrl]);
        }
      },
      errorCode => {

        if (errorCode == 401) {
          this.loading = false;
          this.unauthorized = true;
        }
      }
      );
  }



}
