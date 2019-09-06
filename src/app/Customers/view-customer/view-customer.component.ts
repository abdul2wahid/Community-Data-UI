import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomersService } from '../Customers.service'

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  //styleUrls: ['./view-customer.component.css'],
  "styles": [
    "../node_modules/primeng/resources/themes/nova-light/theme.css",
    "../node_modules/primeng/resources/primeng.min.css",
    "../node_modules/primeicons/primeicons.css",
    //...
  ],
 
})
export class ViewCustomerComponent implements OnInit {

  BasicCustomersList: BasicCustomersModel[]
  public baseURL = "http://localhost:49438/api/";
  constructor(private custService: CustomersService) { }

  ngOnInit() {
    setTimeout(() => {
      this.custService.getCustomers(this.baseURL + "Customer", "1", "1", "").subscribe(
        data => {
          this.BasicCustomersList = data;
        })}, 1000);
    
  }

}


export interface BasicCustomersModel {
  customerID;
  cutomerName;
  age;
  gender;
  maritalStatus;
  occupation;
  mobileNumber;
}
