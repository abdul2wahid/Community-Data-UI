import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../Customers.service'
import { AppService } from '../../app.service'
import { Router, ActivatedRoute } from '@angular/router';

import { DetailCustomerModel } from '../Models/DetailCustomerModel';
import { GenderModel } from 'src/app/AppModel/GenderModel';
import { OccupationModel } from '../../AppModel/OccupationModel';
import { MarriageModel } from '../../AppModel/MarriageModel';
import { DropdownModule } from 'primeng/dropdown';
import { CityModel } from 'src/app/AppModel/CityModel';
import { StatesModel } from 'src/app/AppModel/StatesModel';
import { PinCodeModel } from 'src/app/AppModel/PinCodeModel';
import { EducationModel } from 'src/app/AppModel/EducationModel';
import { ArabicEducationModel } from 'src/app/AppModel/ArabicEducationModel';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detailcustomer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  DetailCustomerModelList: DetailCustomerModel[];
  genderList: GenderModel[];
  selectedGender: GenderModel;

  marriageList: MarriageModel[];
  selectedMarriage: MarriageModel;

  occupationList: OccupationModel[];
  selectedOccupation: OccupationModel;

  cityList: CityModel[];
  statesList: StatesModel[];
  pinList: PinCodeModel[];
  educationList: EducationModel[];
  arabicEducationList: ArabicEducationModel[];
  
  depUserName: string;
  depDOB: string;
  relChoice: string;


  constructor(private custService: CustomersService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe:DatePipe) { }
  
  ngOnInit() {



    this.appService.getGender().subscribe(
      data => {
        this.genderList = data;
      });


    this.appService.getMarriage().subscribe(
      data => {
        this.marriageList = data;
      });


    this.appService.getOccupation().subscribe(
      data => {
        this.occupationList = data;
      });


    this.appService.GetCities().subscribe(
      data => {
        this.cityList = data;
      });

    this.appService.GetStates().subscribe(
      data => {
        this.statesList = data;
      });

    this.appService.getPinCodes().subscribe(
      data => {
        this.pinList = data;
      });


    this.appService.GetEducation().subscribe(
      data => {
        this.educationList = data;
      });

    this.appService.GetArabicEducation().subscribe(
      data => {
        this.arabicEducationList = data;
      });

    setTimeout(() => {
      this.custService.getCustomer("Customer/Detail", this.route.snapshot.paramMap.get('id')).subscribe(
        data => {
          this.DetailCustomerModelList = data;
        })
    }, 200);



  }

  updateEvent() {
    this.UpdateListItems();
    this.custService.updateCustomer("Customer/Update", this.DetailCustomerModelList).subscribe(
      data => {
        this.router.navigate(['./customers']);
      })
  };

  UpdateListItems() {
    for (let i = 0; i < this.DetailCustomerModelList.length; i++) {

      if (isNullOrUndefined(this.DetailCustomerModelList[i].educationName ))
        this.DetailCustomerModelList[i].educationId = 0;
      else
        this.DetailCustomerModelList[i].educationId = this.educationList.find(x => x.educationName == this.DetailCustomerModelList[i].educationName).educationId;

      if (isNullOrUndefined(this.DetailCustomerModelList[i].arabicEducationName ))
        this.DetailCustomerModelList[i].arabicEducationID = 0;
      else
        this.DetailCustomerModelList[i].arabicEducationID = this.arabicEducationList.find(x => x.arabicEducationName == this.DetailCustomerModelList[i].arabicEducationName).arabicEducationId;

      if (isNullOrUndefined(this.DetailCustomerModelList[i].occupation ))
        this.DetailCustomerModelList[i].occupationId = 0;
      else
        this.DetailCustomerModelList[i].occupationId = this.occupationList.find(x => x.occuptionName == this.DetailCustomerModelList[i].occupation).occupationId;

      if (isNullOrUndefined(this.DetailCustomerModelList[i].maritalStatus ))
        this.DetailCustomerModelList[i].maritalStatusId = 0;
      else
        this.DetailCustomerModelList[i].maritalStatusId = this.marriageList.find(x => x.maritalStatus1 == this.DetailCustomerModelList[i].maritalStatus).maritalStatusId;

      if (isNullOrUndefined(this.DetailCustomerModelList[i].gender ))
        this.DetailCustomerModelList[i].genderId = 0;
      else
        this.DetailCustomerModelList[i].genderId = this.genderList.find(x => x.gender1 == this.DetailCustomerModelList[i].gender).genderId;

      if (isNullOrUndefined(this.DetailCustomerModelList[i].city))
        this.DetailCustomerModelList[i].cityId = 0;
      else
        this.DetailCustomerModelList[i].cityId = this.cityList.find(x => x.city1 == this.DetailCustomerModelList[i].city).cityId;

      if (isNullOrUndefined(this.DetailCustomerModelList[i].state))
        this.DetailCustomerModelList[i].stateId = 0;
      else
        this.DetailCustomerModelList[i].stateId = this.statesList.find(x => x.state == this.DetailCustomerModelList[i].state).StateId;

      if (isNullOrUndefined(this.DetailCustomerModelList[i].pin))
        this.DetailCustomerModelList[i].pinId = 0;
      else
        this.DetailCustomerModelList[i].pinId = this.pinList.find(x => x.pin == this.DetailCustomerModelList[i].pin).pinId;
    }
    
  };


  AddDependent(item: DetailCustomerModel) {
    document.getElementById('Add&Search').style.display = 'block';
  }





  DeleteDependent(item: DetailCustomerModel) {
    this.DetailCustomerModelList.find(x => x.customerID == item.customerID).dependantToBeDeleted = true;
  }


  parentID: string;
  FindAndAddDependent() {
    document.getElementById('SearchResult').innerText = "";
    if (isNullOrUndefined(this.depUserName) || isNullOrUndefined(this.depDOB) || isNullOrUndefined(this.relChoice)) {
      document.getElementById('SearchResult').innerText = 'Incorrect Input, please select all values';
      return;

    }
    else if (this.depUserName == "" || this.depDOB == "" || this.relChoice == "") {
      document.getElementById('SearchResult').innerText = 'Incorrect Input, please select all values';
      return;
    }
    else {
      let duplicate = this.DetailCustomerModelList.find(x => x.cutomerName.toLocaleLowerCase() == this.depUserName.toLocaleLowerCase() &&
        x.dob == this.datePipe.transform(this.depDOB, "dd-MM-yyyy"));
      if (!isNullOrUndefined(duplicate)) {
        document.getElementById('SearchResult').innerText = 'User already listed, duplicate user';
        return;
      }
    }
 
    this.custService.findCustomer("Customer/Find", this.depUserName, this.datePipe.transform(this.depDOB, "dd-MM-yyyy")).subscribe(
      data => {
        if (data >= 0) {
          this.custService.getCustomer("Customer/Detail", data.toString()).subscribe(
            x => {
              if (x.length == 1) {
                  
                this.parentID = this.DetailCustomerModelList.find(x => x.wifeId == null && x.childrenId == null).customerID
                x[0].dependantParentID = this.parentID;

                if (this.relChoice == "Child")
                  x[0].childrenId = x[0].customerID;
                else
                  x[0].wifeId = x[0].customerID;

                this.DetailCustomerModelList.push(x[0]);
                document.getElementById('SearchResult').innerText = 'User Found and listed below, Please click on save to add the newly listed dependent';
              }
              else {
                document.getElementById('SearchResult').innerText = 'This user has dependents, cant add as dependent';
              }
            });
        }
        else {
          document.getElementById('SearchResult').innerText = 'Either User Not Found or already added as dependent to other user';
        }
      });
  }
}
