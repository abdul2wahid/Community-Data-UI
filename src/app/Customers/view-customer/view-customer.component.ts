import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CustomersService } from '../Customers.service'
import { BasicCustomerModel } from '../Models/BasicCustomerModel';
import { GenderModel } from 'src/app/AppModel/GenderModel';
import { MarriageModel } from 'src/app/AppModel/MarriageModel';
import { OccupationModel } from 'src/app/AppModel/OccupationModel';
import { AppService } from '../../app.service'
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
      });


    this.appService.getMarriage().subscribe(
      data => {
        this.marriageList = data;
      });


    this.appService.getOccupation().subscribe(
      data => {
        this.occupationList = data;
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
  custID: string;
  DeleteEvent(row: BasicCustomerModel) {
    this.custID = row.customerID;
    document.getElementById('myModal').style.display = "block";
    //document.getElementById('viewContainer').style.display = "none";
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

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
      this.custService.getCustomers("Customer", "1", event.first +1, "").subscribe(
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
