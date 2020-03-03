import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapboxGLModule
    .withConfig({
      accessToken: 'pk.eyJ1IjoiamFyb3RoZXBybyIsImEiOiJjazc5N3Zqb3IwN21pM2ZyenkxbWV6MGZoIn0.HF-Hehvh2miXrHH4qqqdIw'
      // geocoderAccessToken: 'TOKEN'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
