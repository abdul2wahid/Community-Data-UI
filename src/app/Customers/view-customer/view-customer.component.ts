import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CustomersService } from '../Customers.service'
import { BasicCustomerModel } from '../Models/BasicCustomerModel';
import { GenderModel } from 'src/app/AppModel/GenderModel';
import { MarriageModel } from 'src/app/AppModel/MarriageModel';
import { OccupationModel } from 'src/app/AppModel/OccupationModel';
import { AppService } from '../../app.service'
import { isNullOrUndefined, isNumber } from 'util';
import { saveAs } from '../../../..//node_modules/file-saver';


@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],

})
export class ViewCustomerComponent implements OnInit {

  BasicCustomersList: BasicCustomerModel[]

  totalRecords: number = 10;
  pageIndex: number = 1;
  pageSize: number = 10;

  genderList: GenderModel[];
  marriageList: MarriageModel[];
  occupationList: OccupationModel[];

  occupationFilter: string ="";
  genderFilter: string = "";
  marriageFilter: string = "";
  searchString: string = "";

  constructor(private custService: CustomersService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService, ) { }

  ngOnInit() {
    //setTimeout(() => {
    //  this.custService.getCustomers("Customer", "1", "1", "").subscribe(
    //    data => {
    //      this.BasicCustomersList = data['items'];
    //      this.totalRecords = data['count'];
    //      this.pageIndex = data['pageIndex'];
    //     this.pageSize = data['pageSize'];
    //    })
    //}, 200);
    this.appService.getGender().subscribe(
      data => {
        this.genderList = data;
        var dummyModel = {} as GenderModel;
        this.genderList.splice(0, 0, dummyModel);
      });


    this.appService.getMarriage().subscribe(
      data => {
        this.marriageList = data;
        var dummyModel = {} as MarriageModel;
        this.marriageList.splice(0, 0, dummyModel);
      });


    this.appService.getOccupation().subscribe(
      data => {
        this.occupationList = data;
        var dummyModel = {} as OccupationModel;
        this.occupationList.splice(0, 0, dummyModel);

      });

  }

  EditEvent(row: BasicCustomerModel) {
    this.router.navigate(['./edit', row.customerID], { relativeTo: this.route, });
  }

  ViewEvent(row: BasicCustomerModel) {
    this.router.navigate(['./view', row.customerID], { relativeTo: this.route, });
  }


  AddEvent(row: BasicCustomerModel) {
    this.router.navigate(['./add'], { relativeTo: this.route, });
  }

  DownloadEvent() {
    this.custService.downloadCustomer("Customer/DownloadCustomers/").subscribe(
      data => this.downloadFile(data)),//console.log(data),
      error => console.log('Error downloading the file.'),
      () => console.info('OK');
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'text/csv' });
    saveAs(blob, 'Users.xlsx');
  }

  custID: string;
  DeleteEvent(row: BasicCustomerModel) {
    this.custID = row.customerID;
    document.getElementById('myModal').style.display = "block";
    //document.getElementById('viewContainer').style.display = "none";
  }

  FilterEvent() {
    this.searchString = "";
    this.LoadRows(null);
  }

  SearchEvent() {
    this.genderFilter = '';
    this.occupationFilter = '';
    this.marriageFilter = '';
    this.LoadRows(null);
  }

  confirm() {
    if (this.custID != "") {
      this.custService.deleteCustomer("Customer/", this.custID).subscribe(
        data => {
          if (data) {
            document.getElementById('myText').innerText = "Deleted succesfully";
            document.getElementById('myButton').style.display = "none";
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

    close() {
      this.custID = "";
    document.getElementById('myModal').style.display = "none";
    }

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
      this.custService.getCustomers("Customer", "1", pageNumer + 1, filteString).subscribe(
        data => {
          this.BasicCustomersList = data['items'];
          this.totalRecords = data['count'];
          this.pageIndex = data['pageIndex'];
          this.pageSize = data['pageSize'];
          this.pageSize = this.totalRecords / this.pageSize;
        })
    }, 200);
  }

}
