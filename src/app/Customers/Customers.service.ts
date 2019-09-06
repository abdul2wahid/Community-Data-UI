import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BasicCustomersModel } from './view-customer/view-customer.component';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  public httpOptions: any;
  public result: any;

  constructor(private _http: HttpClient) {
    //Http Headers Options
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
  }

  public getCustomers(baseUrl: string, sortOrder: string, currentPageNo: string, filterString : string, ) {

    let params = new HttpParams().set('sortOrder', sortOrder).append('currentPageNo', currentPageNo)
    .append('filterString', filterString);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { params: params, headers: headers };


    return this._http.get<BasicCustomersModel[]>(baseUrl, options)
      .pipe(
        catchError(this.handleError)
      );
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      error);
  };


  //Get Customer Model
  public getCustomerModel(baseUrl: string) {
    return this._http.get(baseUrl);
  };

  //Add Customer API call.
  public addCustomer(baseUrl: string, customer: any) {
    return this._http.post(baseUrl, customer, this.httpOptions);
  }
}


