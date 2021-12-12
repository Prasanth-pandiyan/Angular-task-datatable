import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

// import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { ViewComponent } from './component/view/view.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from './service/service.service';
import { TokenInterceptor } from './service/token.interceptor';
import { ViewUserComponent } from './component/view-user/view-user.component';
// import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ViewComponent,
    LayoutComponent,
    ViewUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // MatDialogModule,
    HttpClientModule,
    GooglePlaceModule,
    // BrowserAnimationsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCSIFuXPQXel1splGkx5ElXoU1bL60Jn-I'
    // })
  ],
  providers: [ServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
