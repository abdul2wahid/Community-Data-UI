import { Component, OnInit } from '@angular/core';
import { GenderModel } from 'src/app/AppModel/GenderModel';
import { MarriageModel } from 'src/app/AppModel/MarriageModel';
import { OccupationModel } from 'src/app/AppModel/OccupationModel';
import { BasicUserModel } from '../Models/BasicUserModel';
import { UsersService } from '../users.service'
import { isNullOrUndefined } from 'util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CustomersService } from 'src/app/Customers/Customers.service';
import { RoleModel } from 'src/app/AppModel/RoleModel';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  BasicUsersist: BasicUserModel[]

  totalRecords: number = 10;
  pageIndex: number = 1;
  pageSize: number = 10;

  roleList: RoleModel[];
  

  occupationFilter: string = "";
  genderFilter: string = "";
  marriageFilter: string = "";
  searchString: string = "";

  FindUserForm: FormGroup;
  depUserName: string;
  depDOB: string;
  userId: string;

  constructor(private usersService: UsersService,
    private datePipe: DatePipe,
    private custService: CustomersService,
    private appService: AppService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.FindUserForm = this.formBuilder.group(
      {
        searchName: ['', Validators.required],
        searchDOB: ['', Validators.required],

      });


    this.appService.getRoles().subscribe(
      data => {
        this.roleList = data;
      });
  }
  // convenience getter for easy access to form fields
  get getFindFormControls() { return this.FindUserForm.controls; }

  LoadRows(event: any) {

    //https://github.com/pritspatel/PrimeDatatableLazyLoad/blob/master/frontend/src/app/customer-list/customer-list.component.ts
    let pageNumer = "0";

    if (!isNullOrUndefined(event)) {
      pageNumer = event.first;
    }

    let filteString: string;
    filteString = this.genderFilter + ";" + this.marriageFilter + ";" + this.occupationFilter + ";" + this.searchString;
    filteString = filteString.replace(/undefined/gi, "")
    setTimeout(() => {
      this.usersService.getUsers("User", "1", pageNumer + 1, filteString).subscribe(
        data => {
          this.BasicUsersist = data['items'];
          this.totalRecords = data['count'];
          this.pageIndex = data['pageIndex'];
          this.pageSize = data['pageSize'];
          this.pageSize = this.totalRecords / this.pageSize;
        })
    }, 200);
  }

  displayAddWindow() {
    document.getElementById('Add&Search').style.display = 'block';
  }

  AddUserToAdmin() {
   
    if (this.FindUserForm.invalid) {
      this.FindUserForm.markAllAsTouched();
      return;
    }

    document.getElementById('SearchResult').innerText = "";
    if (isNullOrUndefined(this.depUserName) || isNullOrUndefined(this.depDOB) ) {
      document.getElementById('SearchResult').innerText = 'Incorrect Input, please select all values';
      return;

    }
    else if (this.depUserName == "" || this.depDOB == "" ) {
      document.getElementById('SearchResult').innerText = 'Incorrect Input, please select all values';
      return;
    }
    else {
      let obj = {
        userName: this.depUserName,
        roleId: 2,
        dob: this.datePipe.transform(this.depDOB, "dd/MM/yyyy"),
      
      };

      this.usersService.addUserToManagement("User",obj ).subscribe(
        data => {
          if (data.toString() == "true") {
            document.getElementById('SearchResult').innerText = 'User already listed, duplicate user';
          }
          else {
            document.getElementById('SearchResult').innerText = data.toString();
          }
        });

      }
    }

  }

