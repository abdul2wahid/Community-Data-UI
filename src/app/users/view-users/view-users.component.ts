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
import { BasicCustomerModel } from 'src/app/Customers/Models/BasicCustomerModel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  BasicUsersist: BasicUserModel[];

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
  isDisabled: boolean[] = [];
  oldPassword: string="";
  confirmPassword: string="";
  newPassword: string="";
  updateResults: string = "";
  isResultVisible: boolean = false;

  constructor(private usersService: UsersService,
    private datePipe: DatePipe,
    private custService: CustomersService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,) { }
  roleBasedHiding: boolean = false;

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

    
    this.roleBasedHiding = this.appService.UpdateRoleBasedHiding();
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

          for (let i = 0; i < this.BasicUsersist.length; i++) {
            this.isDisabled[i] = true;
          }
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
          if (data.toString().toLowerCase() == "success") {
            document.getElementById('Add&Search').style.display = 'none';
            this.reload();
          }
          else {
            document.getElementById('SearchResult').innerText = data.toString();

          }
        });

      }
    }

  custID: string;
  DeleteEvent(row: BasicUserModel) {
    this.custID = row.userId;
    document.getElementById('myModal').style.display = "block";
    //document.getElementById('viewContainer').style.display = "none";
  }

  reload() {
    setTimeout(() => {
      this.usersService.getUsers("User", "1", "1", ";").subscribe(
        data => {
          this.BasicUsersist = data['items'];
          this.totalRecords = data['count'];
          this.pageIndex = data['pageIndex'];
          this.pageSize = data['pageSize'];
          this.pageSize = this.totalRecords / this.pageSize;

          for (let i = 0; i < this.BasicUsersist.length; i++) {
            this.isDisabled[i] = true;
          }
        })
    }, 10);
  }

  EditEvent(rowIndex: number) {
    this.isDisabled[rowIndex] = false;
  }

  SaveEvent(rowIndex: number, row: BasicUserModel) {
    row.dob = this.datePipe.transform(row.dob, "dd/MM/yyy");
    this.usersService.saveUser("User/UpdateRole", row).subscribe(
      data => {
        if (data["roleId"] == row.roleId) {
          this.isDisabled[rowIndex] = true;
        }
       
      });
    
  }

  confirm() {
    if (this.custID != "") {
      this.usersService.deleteUser("User/", this.custID).subscribe(
        data => {
          if (data) {
            document.getElementById('myText').innerText = "Deleted succesfully";
            document.getElementById('myButton').style.display = "none";
            this.close();
            this.reload();
          }
          else {
            document.getElementById('myText').innerText = "Failed to Delete";
            document.getElementById('myButton').style.display = "none";
          }
        })
    }
    else {
      document.getElementById('myText').innerText = "Failed to Delete";
      document.getElementById('myButton').style.display = "none";
    }
  }

  custId: number = -1;
  custName: string = "";
  DisplayPasswordModel(row: BasicUserModel) {
    this.custId = row.userId;
    this.custName = row.userName;
    this.isResultVisible = false;
    this.updateResults = "";

    document.getElementById('myModalChangePassword').style.display = "block";
  }

  ChangePassword(isReset: boolean) {
    let validation: boolean = false;
    if (isReset) {
      validation = true;
    }
    else if (this.oldPassword != "" && this.confirmPassword != ""
      && this.newPassword != "" && this.newPassword.length >= 5
      && this.newPassword == this.confirmPassword) {
      validation = true;
     
    }
    if (validation) {
      let obj = {
        UserId: this.custId,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
        oldPassword: this.oldPassword,

      };
      this.usersService.ChangePassword("User/UpdatePassword", obj).subscribe(
        data => {
          if (data.toString().toLowerCase() == "true") {
            this.isResultVisible = true;
            this.updateResults = "Updated Successfully";
          }
          else {
            this.isResultVisible = true;
            this.updateResults = "Update failed";

          }
        }
      );
    }
    else {
      this.isResultVisible = true;
      this.updateResults = "Update failed";

    }
  }

  close() {
    this.custID = "";
    this.custName = '';
    document.getElementById('myModal').style.display = "none";

    document.getElementById('myModalChangePassword').style.display = "none";
  }
  }

