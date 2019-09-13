import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { LoginService } from 'src/app/Login/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  display: boolean;
  constructor(private location: Location,
    private router : Router) {
    if (location.path() != "" && location.path() != "/login") {
      this.display = true;
    }
  }
 
  

   
  ngOnInit() {
  }

}
