import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError} from 'rxjs'
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (sessionStorage.getItem('Token') != null) {
      request = request.clone({
        setHeaders: {
          Token: sessionStorage.getItem('Token')
        }
      });
    }
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
          
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            if (!isNullOrUndefined(error)) {
              if (!isNullOrUndefined(error.error) && error.status == 500) {
                if (error.error == "Token Expired") {
                  sessionStorage.removeItem('Token');
                  this.router.navigate(['']);
                }
              }

            }
          }


          return throwError(errorMessage);
        })
      );
  }
}
