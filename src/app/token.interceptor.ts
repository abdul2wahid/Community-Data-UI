import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable} from 'rxjs'
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor( ){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (sessionStorage.getItem('Token')!=null)
    {
      request = request.clone({
        setHeaders: {
          Token: sessionStorage.getItem('Token')
        }
      });
    }
    return next.handle(request);
  }
}
