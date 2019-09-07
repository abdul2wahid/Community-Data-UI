import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
    
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
