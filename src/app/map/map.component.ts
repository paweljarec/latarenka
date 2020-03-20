import { ComunnicationService } from './../services/comunnication.service';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public geojson: any;
  map: mapboxgl.Map;
  gmina: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  lastFocusedLantern: any;

  constructor(
    private http: HttpClient,
    private communicationService: ComunnicationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.http
      .get('assets/gmina-brzyska.txt', { responseType: 'text' })
      .subscribe(data => {
        this.gmina = JSON.parse(data);
      });

    this.geojson = this.communicationService.lanterns;

    this.communicationService.damagedLantern$.subscribe(lantern => {
      this.lastFocusedLantern.properties.isHighlighted = false;
      lantern.properties.isDamaged = true;
    });

    this.communicationService.flyToLocation$.subscribe(lanternCord => {
      this.map.flyTo({
        center: [
          lanternCord.x,
          lanternCord.y
        ],
        essential: true,
        zoom: 18
      });
    });
  }

  public clicked(feature: any) {
    if (this.lastFocusedLantern) {
      this.lastFocusedLantern.properties.isHighlighted = false;
    }
    this.communicationService.setLanternFocused(feature);
    feature.properties.isHighlighted = true;
    this.lastFocusedLantern = feature;
  }

  public clickedDamaged() {
    this.openSnackBar('Ta latarnia została już zgłoszona!', null);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  mapLoad(ee: any) {
    this.map = ee;
    this.map.setMaxZoom(18);
    this.map.setMinZoom(11);

    this.map.addSource('some id', {
      type: 'geojson',
      data: this.gmina
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('zoom', (e: any) => {
      const iconSize = e.target.transform._zoom * 5 - 40;
      document.querySelector('body').style.cssText =
        '--my-var:' + iconSize + 'px';
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
  }
}
