import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BasicCustomerModel } from '../Customers/Models/BasicCustomerModel'

import { AppSettings } from '../app.settings';
import { BasicUserModel } from './Models/BasicUserModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

  public getUsers(url: string, sortOrder: string, currentPageNo: string, filterString: string, ) {

    let params = new HttpParams().set('sortOrder', sortOrder).append('currentPageNo', currentPageNo)
      .append('filterString', filterString);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { params: params, headers: headers };


    return this._http.get<BasicUserModel[]>(AppSettings.API_ENDPOINT + url, options)
      .pipe(
        catchError(this.handleError)
      );
  };


  public addUserToManagement(url: string, cust: any) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this._http.post(AppSettings.API_ENDPOINT + url, cust, options)
      .pipe(
      catchError(this.handleError)
    );
      
  };

  public deleteUser(url: string, id: string) {

    let params = new HttpParams().set('id', id);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };


    return this._http.delete<string>(AppSettings.API_ENDPOINT + url + id, options)
      .pipe(
        catchError(this.handleError)
      );
  };

  public saveUser(url: string, cust: any) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const options = { headers: headers };

    return this._http.put<BasicUserModel>(AppSettings.API_ENDPOINT + url, cust, options)
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
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError(
      error);
  };


}
