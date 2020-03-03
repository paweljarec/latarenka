import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: mapboxgl.Map;

  constructor() {}

  ngOnInit() {}

  // get the map instance and lsiten on zoom level to manipulate size variable
  ngAfterViewInit(): void {
    // this.map = new mapboxgl.Map({container:});
    // this.map.on('zoomed', function(e) {
    //   console.log('zoom event');
    // });
  }

  public clicked() {
    console.log('test');
    console.log(this.map);

    // document.querySelector("body").style.cssText = "--my-var: #000";
  }

  mapLoad(ee: any) {
    this.map = ee;
    this.map.setMaxZoom(18);
    this.map.setMinZoom(13);
    this.map.on('zoom', (e: any) => {
      const iconSize = e.target.transform._zoom * 5 - 40;
      document.querySelector('body').style.cssText = '--my-var:' + iconSize + 'px';
    });
  }
}
