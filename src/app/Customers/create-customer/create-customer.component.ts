import { Component, OnInit } from '@angular/core';
import { DetailCustomerModel } from '../Models/DetailCustomerModel';
import { CustomersService } from '../Customers.service'
import { Router, ActivatedRoute, Event } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppService } from '../../app.service'
import { GenderModel } from 'src/app/AppModel/GenderModel';
import { MarriageModel } from 'src/app/AppModel/MarriageModel';
import { OccupationModel } from 'src/app/AppModel/OccupationModel';
import { CityModel } from 'src/app/AppModel/CityModel';
import { StatesModel } from 'src/app/AppModel/StatesModel';
import { PinCodeModel } from 'src/app/AppModel/PinCodeModel';
import { EducationModel } from 'src/app/AppModel/EducationModel';
import { ArabicEducationModel } from 'src/app/AppModel/ArabicEducationModel';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {


  DetailCustomerModel: DetailCustomerModel;

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

  CreateUserForm: FormGroup;


  custNameRequired: boolean;

  constructor(private custService: CustomersService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
   ) { }

  ngOnInit() {

    this.CreateUserForm = this.formBuilder.group(
      {
        Name: ['', Validators.required],
        DOB: ['', Validators.required],
        gender: ['', Validators.required],
        maritalStatus: ['', Validators.required],
        occupation: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        occupationDetails: ['', Validators.required],
        area: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pin: ['', Validators.required],
        educationName: ['', Validators.required],
        arabicEducationName: ['', Validators.required],
        educationDetails: [''],
        arabicEducationID: [''],
        educationId: [''],


      });

    this.GetMasterData();
    this.DetailCustomerModel ={
      customerID : -1,
      Name :"",
      age : -1,
      dob: "2012-04-23T18:25:43.511Z",
      genderId : -1,
      gender : "",
      maritalStatus : "",
      maritalStatusId : -1,
      occupation : "",
      occupationId : -1,
      mobileNumber : "",
      educationDetails : "",
      occupationDetails : "",
      arabicEducationID : -1,
      arabicEducationName : "",
      educationName : "",
      educationId : -1,
      address1 : "",
      address2 : "",
      area : "",
      cityId : -1,
      pinId : -1,
      stateId : -1,
      city : "",
      pin : "",
      state : "",
      DateFormatDOB: "2012-04-23T18:25:43.511Z",

      createdBy:"",
      createdOn:"2012-04-23T18:25:43.511Z",
      updatedBy:"",
      updatedOn:"2012-04-23T18:25:43.511Z",


      childrenId: -1,
      wifeId: -1,
      dependantToBeDeleted: false,
      dependantParentID: -1,
      dependantToBeAddedAsChild: false,

    }
  }

  ChangedEvent(event: Event) {
    debugger;
  }

   //convenience getter for easy access to form fields
  get getControls() { return this.CreateUserForm.controls; }

  SaveEvent() {

    if (this.CreateUserForm.invalid)
    {
      this.CreateUserForm.markAllAsTouched();
      return;
    }

    this.DetailCustomerModel = this.CreateUserForm.value;

    this.DetailCustomerModel.arabicEducationID =
      this.arabicEducationList.find(x => x.arabicEducationName == this.DetailCustomerModel.arabicEducationName).arabicEducationId;
    this.DetailCustomerModel.educationId =
      this.educationList.find(x => x.educationName == this.DetailCustomerModel.educationName).educationId;
    this.DetailCustomerModel.maritalStatusId =
      this.marriageList.find(x => x.maritalStatus1 == this.DetailCustomerModel.maritalStatus).maritalStatusId;
    this.DetailCustomerModel.genderId =
      this.genderList.find(x => x.gender1 == this.DetailCustomerModel.gender).genderId;
    this.DetailCustomerModel.occupationId =
      this.occupationList.find(x => x.occuptionName == this.DetailCustomerModel.occupation).occupationId;

    this.DetailCustomerModel.pinId =
      this.pinList.find(x => x.pin == this.DetailCustomerModel.pin).pinId;

    this.DetailCustomerModel.cityId =
      this.cityList.find(x => x.city1 == this.DetailCustomerModel.city).cityId;

    this.DetailCustomerModel.stateId =
      this.statesList.find(x => x.state == this.DetailCustomerModel.state).StateId;


    this.custService.CreateCustomer("Customer", this.DetailCustomerModel).subscribe(
     data => {
        this.router.navigate(['./customers']);
      })
  }


  CancelEvent() {
    this.router.navigate(['./customers']);
  }

  


GetMasterData()
{

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
}
}
