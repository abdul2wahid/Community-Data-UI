import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CalendarModule } from 'primeng/calendar';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppService } from '../app.service';
import { SharedService } from '../shared/Shared.Service';
import { isNullOrUndefined } from 'util';

//import { AlertService, AuthenticationService } from '../_services';


@Component(
  { templateUrl: 'Login.component.html' }
)
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  unauthorized = false;
  submitted = false;
  returnUrl: "/customers";
  result: string;
  
 
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
    this.unauthorized = false;
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
    this.authenticationService.Login( "User/Login", credentials)
      .pipe(first())
      .subscribe(
      data => {
        var jsonData = JSON.parse(data.toString());
        if (isNullOrUndefined(jsonData.token))  {
          this.loading = false;
          this.unauthorized = true;
        }
        else {
       
          sessionStorage.setItem('Token', jsonData.token);
          sessionStorage.setItem('R', jsonData.Role);
          this.router.navigate(['/users']);
        }
      },
      errorCode => {
        this.unauthorized = true;
        this.loading = false;
      }
      );
  }



}
