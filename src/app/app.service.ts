import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GenderModel } from './AppModel/GenderModel';
import { AppSettings } from './app.settings';
import { MarriageModel } from './AppModel/MarriageModel';
import { OccupationModel } from './AppModel/OccupationModel';
import { CityModel } from './AppModel/CityModel';
import { StatesModel } from './AppModel/StatesModel';
import { PinCodeModel } from './AppModel/PinCodeModel';



@Injectable({
  providedIn: 'root'
})
export class AppService {

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


  public getGender( ) {

    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = {  headers: headers };


    return this._http.get<GenderModel[]>(AppSettings.API_ENDPOINT + "/Utility/GetGender", options)
      .pipe(
        catchError(this.handleError)
      );
  };

  public getMarriage() {


    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };


    return this._http.get<MarriageModel[]>(AppSettings.API_ENDPOINT + "/Utility/GetMaritalstatus", options)
      .pipe(
        catchError(this.handleError)
      );
  };


  public getOccupation() {


    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };


    return this._http.get<OccupationModel[]>(AppSettings.API_ENDPOINT + "/Utility/GetOccupation", options)
      .pipe(
        catchError(this.handleError)
      );
  };


  public GetCities() {


    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };


    return this._http.get<CityModel[]>(AppSettings.API_ENDPOINT + "/Utility/GetCities", options)
      .pipe(
        catchError(this.handleError)
      );
  };

  public GetStates() {


    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };


    return this._http.get<StatesModel[]>(AppSettings.API_ENDPOINT + "/Utility/GetStates", options)
      .pipe(
        catchError(this.handleError)
      );
  };

  public getPinCodes() {


    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };


    return this._http.get<PinCodeModel[]>(AppSettings.API_ENDPOINT + "/Utility/GetPincodes", options)
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

}
