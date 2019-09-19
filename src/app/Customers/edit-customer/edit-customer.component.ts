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
import { isNullOrUndefined, debug } from 'util';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

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

  FindUserForm: FormGroup;
  myArray: FormArray;
  EditUserForm: FormGroup;

  constructor(private custService: CustomersService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder) { }

  ngOnInit() {


    this.FindUserForm = this.formBuilder.group(
      {
        searchName: ['', Validators.required],
        searchDOB: ['', Validators.required],
        realt: [''],
      });

   

    var modal = <DetailCustomerModel>{};
    this.EditUserForm = this.formBuilder.group(
      {
        myArray: this.formBuilder.array([])
      });


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


          if (this.DetailCustomerModelList.length >= 1) {
            this.myArray = this.EditUserForm.get('myArray') as FormArray;
            while (this.myArray.length !== 0) {
              this.myArray.removeAt(0)
            }
            
            for (let i = 0; i < this.DetailCustomerModelList.length; i++) {

              this.myArray.push(this.createItem(this.DetailCustomerModelList[i]));

            }
          }
        })
    }, 200);


    this.relChoice = "Child";





  }

  createItem(DetailCustomerModel: DetailCustomerModel): FormGroup {
  
    return this.formBuilder.group({
     
      customerID: [ DetailCustomerModel.customerID , Validators.required],
      name: [ DetailCustomerModel.name, Validators.required],
      dob: [ DetailCustomerModel.dob, Validators.required],
      genderId: [DetailCustomerModel.genderId ],
      gender: [ DetailCustomerModel.gender , Validators.required],
      maritalStatus: [ DetailCustomerModel.maritalStatus , Validators.required],
      maritalStatusId: [ DetailCustomerModel.maritalStatusId],
      occupation: [DetailCustomerModel.occupation , Validators.required],
      occupationId: [ DetailCustomerModel.occupationId ],
      mobileNumber: [ DetailCustomerModel.mobileNumber , Validators.required],

      educationDetails: [DetailCustomerModel.educationDetails ],
      occupationDetails: [DetailCustomerModel.occupationDetails , Validators.required],
      arabicEducationID: [DetailCustomerModel.arabicEducationID ],
      arabicEducationName: [DetailCustomerModel.arabicEducationName , Validators.required],
      educationName: [DetailCustomerModel.educationName , Validators.required],
      educationId: [DetailCustomerModel.educationId ],


      address1: [DetailCustomerModel.address1 ],
      address2: [DetailCustomerModel.address2 ],
      area: [DetailCustomerModel.area , Validators.required],
      cityId: [DetailCustomerModel.cityId ],
      pinId: [DetailCustomerModel.pinId ],

      city: [DetailCustomerModel.city , Validators.required],
      pin: [DetailCustomerModel.pin , Validators.required],
      state: [DetailCustomerModel.state, Validators.required],

      stateId: [DetailCustomerModel.stateId ],

      createdBy: [DetailCustomerModel.createdBy ],
      createdOn: [DetailCustomerModel.createdOn ],
      updatedBy: [DetailCustomerModel.updatedBy ],
      updatedOn: [DetailCustomerModel.updatedOn ],

      wifeId: [DetailCustomerModel.wifeId ],
      childrenId: [DetailCustomerModel.childrenId ],
      dependantParentID: [DetailCustomerModel.dependantParentID ],
      dependantToBeAddedAsChild: [DetailCustomerModel.dependantToBeAddedAsChild ],
      dependantToBeDeleted: [DetailCustomerModel.dependantToBeDeleted ],

      //  DateFormatDOB: [''],
    });
  }

  // convenience getter for easy access to form fields
  get getFindFormControls() { return this.FindUserForm.controls; }



  // convenience getter for easy access to form fields
  get getEditFormControls() { return this.EditUserForm.controls.myArray }

  updateEvent() {

    if (this.EditUserForm.controls.myArray.invalid) {
      this.EditUserForm.controls.myArray.markAllAsTouched();
      return;
    }



    this.UpdateListItems();
 
    this.custService.updateCustomer("Customer/Update", this.myArray.getRawValue()).subscribe(
      data => {
        if (data.toString()== "true") {
          this.router.navigate(['./customers']);
        }
      })
  };

  CancelEvent() {
    this.router.navigate(['./customers']);
  }


  UpdateListItems() {
    for (let i = 0; i < this.myArray.controls.length; i++) {

      if (isNullOrUndefined(this.myArray.controls[i].get('educationName')))
        this.myArray.controls[i].get('educationId').setValue(0);
      else
        this.myArray.controls[i].get('educationId').setValue(this.educationList.find(x => x.educationName == this.myArray.controls[i].get('educationName').value).educationId);

      if (isNullOrUndefined(this.myArray.controls[i].get('arabicEducationName')))
        this.myArray.controls[i].get('arabicEducationID').setValue( 0);
      else
        this.myArray.controls[i].get('arabicEducationID').setValue( this.arabicEducationList.find(x => x.arabicEducationName == this.myArray.controls[i].get('arabicEducationName').value).arabicEducationId);

      if (isNullOrUndefined(this.myArray.controls[i].get('occupation')))
        this.myArray.controls[i].get('occupationId').setValue(0);
      else
        this.myArray.controls[i].get('occupationId').setValue( this.occupationList.find(x => x.occuptionName == this.myArray.controls[i].get('occupation').value).occupationId);

      if (isNullOrUndefined(this.myArray.controls[i].get('maritalStatus')))
        this.myArray.controls[i].get('maritalStatusId').setValue( 0);
      else
        this.myArray.controls[i].get('maritalStatusId').setValue( this.marriageList.find(x => x.maritalStatus1 == this.myArray.controls[i].get('maritalStatus').value).maritalStatusId);

      if (isNullOrUndefined(this.myArray.controls[i].get('gender')))
        this.myArray.controls[i].get('genderId').setValue( 0);
      else
        this.myArray.controls[i].get('genderId').setValue( this.genderList.find(x => x.gender1 == this.myArray.controls[i].get('gender').value).genderId);

      if (isNullOrUndefined(this.myArray.controls[i].get('city')))
        this.myArray.controls[i].get('cityId').setValue( 0);
      else
        this.myArray.controls[i].get('cityId').setValue( this.cityList.find(x => x.city1 == this.myArray.controls[i].get('city').value).cityId);



      if (isNullOrUndefined(this.myArray.controls[i].get('pin')))
        this.myArray.controls[i].get('pinId').setValue( 0);
      else
        this.myArray.controls[i].get('pinId').setValue( this.pinList.find(x => x.pin == this.myArray.controls[i].get('pin').value).pinId);


      if (isNullOrUndefined(this.myArray.controls[i].get('state')))
        this.myArray.controls[i].get('stateId').setValue( 0);
      else {
        this.myArray.controls[i].get('stateId').setValue( this.statesList.find(x => x.state == this.myArray.controls[i].get('state').value).stateId);
      }
    }

  };



  AddDependent(item: DetailCustomerModel) {
    document.getElementById('Add&Search').style.display = 'block';
  }





  DeleteDependent(item: DetailCustomerModel) {

    for (let currentItem of this.myArray.controls) {

      if (currentItem.get('customerID').value == item.customerID.value) {

        currentItem.get('dependantToBeDeleted').setValue(true);
      }
    }
 
  }

  parentID: string;

  FindAndAddDependent() {

    debugger;
    if (this.FindUserForm.invalid) {
      this.FindUserForm.markAllAsTouched();
      return;
    }

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
      let duplicate = this.DetailCustomerModelList.find(x => x.name.toLocaleLowerCase() == this.depUserName.toLocaleLowerCase() &&
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

                for (let item of this.myArray.controls) {
                
                  if (item.get('wifeId').value == null && item.get('childrenId').value == null) {
                    x[0].dependantParentID = item.get('customerID').value;
                    break;
                  }
                }

                //this.parentID = this.DetailCustomerModelList.find(x => x.wifeId == null && x.childrenId == null).customerID
                //x[0].dependantParentID = this.parentID;

                if (this.relChoice == "Child")
                  x[0].childrenId = x[0].customerID;
                else
                  x[0].wifeId = x[0].customerID;

                

                this.myArray.push(this.createItem(x[0]));

                let i: number = this.myArray.controls.length - 1;
       

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
