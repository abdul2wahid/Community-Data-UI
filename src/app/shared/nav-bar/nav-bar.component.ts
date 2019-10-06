import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { LoginService } from 'src/app/Login/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

 
  isLoggedIn: boolean;

  constructor(private location: Location,
    private router : Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    
    });
  }
 
  

   
  ngOnInit() {
    var token = sessionStorage.getItem('Token');
    if (token != null) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    sessionStorage.removeItem('Token');
    this.router.navigate(['']);
  }

}
