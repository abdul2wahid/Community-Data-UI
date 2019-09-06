import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CustomersService } from '../Customers.service'

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
 
})
export class ViewCustomerComponent implements OnInit {

  BasicCustomersList: BasicCustomersModel[]
  public baseURL = "http://localhost:80/api/";
  constructor(private custService: CustomersService,
    private router: Router,
    private route: ActivatedRoute, )
  { }

  ngOnInit() {
    setTimeout(() => {
      this.custService.getCustomers(this.baseURL + "Customer", "1", "1", "").subscribe(
        data => {
          this.BasicCustomersList = data;
        })}, 1000);
    
  }

  clickEvent(row: BasicCustomersModel) {
    this.router.navigate(['./details'], { relativeTo: this.route });
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
