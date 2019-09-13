import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../app.settings';


@Injectable({
  providedIn: 'root'
})
export class LoginService{

  public httpOptions: any;
  public result: any;

  constructor(private _http: HttpClient) {
    //Http Headers Options
    this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
    };

   
  }

  public Login(url: string, credentials: any) {
    return this._http.post<string>(AppSettings.API_ENDPOINT + url, credentials, this.httpOptions)
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


