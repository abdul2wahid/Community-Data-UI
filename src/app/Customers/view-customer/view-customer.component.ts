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
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    setTimeout(() => {
      this.custService.getCustomers("Customer", "1", "1", "").subscribe(
        data => {
          this.BasicCustomersList = data;
        })
    }, 200);

  }

  detailsEvent(row: BasicCustomerModel) {
    this.router.navigate(['./edit', row.customerID], { relativeTo: this.route, });
  }



  custID: string;
  deleteEvent(row: BasicCustomerModel) {
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

}
