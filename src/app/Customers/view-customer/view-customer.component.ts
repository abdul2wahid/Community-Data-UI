import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CustomersService } from '../Customers.service'
import { BasicCustomerModel } from '../Models/BasicCustomerModel';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
 
})
export class ViewCustomerComponent implements OnInit {

  BasicCustomersList: BasicCustomerModel[]
 
  constructor(private custService: CustomersService,
    private router: Router,
    private route: ActivatedRoute, )
  { }

  ngOnInit() {
    setTimeout(() => {
      this.custService.getCustomers("Customer", "1", "1", "").subscribe(
        data => {
          this.BasicCustomersList = data;
        })}, 200);
    
  }

  clickEvent(row: BasicCustomerModel) {
    this.router.navigate(['./details',row.customerID], { relativeTo: this.route ,});
  }

}


