import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MaterialModule } from './material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AdminTableComponent } from './admin-table/admin-table.component';

@NgModule({
   declarations: [
      AppComponent,
      MapComponent,
      FormComponent,
      ConfirmationDialogComponent,
      AdminTableComponent
   ],
   imports: [
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      NgxMapboxGLModule
      .withConfig({
        accessToken: 'pk.eyJ1IjoiamFyb3RoZXBybyIsImEiOiJjazc5N3Zqb3IwN21pM2ZyenkxbWV6MGZoIn0.HF-Hehvh2miXrHH4qqqdIw'
        // geocoderAccessToken: 'TOKEN'
      }),
      MaterialModule
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
