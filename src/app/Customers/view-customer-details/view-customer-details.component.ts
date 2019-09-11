import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../Customers.service';
import { DetailCustomerModel } from '../Models/DetailCustomerModel';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.css']
})
export class ViewCustomerDetailsComponent implements OnInit {

  DetailCustomerModelList: DetailCustomerModel[];

  constructor(private custService: CustomersService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    setTimeout(() => {
      this.custService.getCustomer("Customer/Detail", this.route.snapshot.paramMap.get('id')).subscribe(
        data => {
          this.DetailCustomerModelList = data;
        })
    }, 200);

  }

  CancelEvent() {
    this.router.navigate(['./customers']);
  }

}
