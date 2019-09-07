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

@Component({
  selector: 'app-detailcustomer',
  templateUrl: './detailcustomer.component.html',
  styleUrls: ['./detailcustomer.component.css']
})
export class DetailcustomerComponent implements OnInit {

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

  constructor(private custService: CustomersService,
    private appService: AppService,
    private route: ActivatedRoute) { }
  
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


    setTimeout(() => {
      this.custService.getCustomer("Customer/Detail", this.route.snapshot.paramMap.get('id')).subscribe(
        data => {
          this.DetailCustomerModelList = data;
        })
    }, 200);



  }

}
