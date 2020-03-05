import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
public geojson  = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        isDamaged: true
      },
      geometry: {
        type: 'Point',
        coordinates: [
          21.464420557022095,
          49.74737234875042
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        isDamaged: false
      },
      geometry: {
        type: 'Point',
        coordinates: [
          21.464763879776,
          49.74725622867056
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        isDamaged: false
      },
      geometry: {
        type: 'Point',
        coordinates: [
          21.465176939964294,
          49.747124510034546
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        isDamaged: false
      },
      geometry: {
        type: 'Point',
        coordinates: [
          21.465512216091156,
          49.7470031899218
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        isDamaged: false
      },
      geometry: {
        type: 'Point',
        coordinates: [
          21.464273035526276,
          49.74720076823584
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        isDamaged: false
      },
      geometry: {
        type: 'Point',
        coordinates: [
          21.46462708711624,
          49.74707251573766
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        isDamaged: false
      },
      geometry: {
        type: 'Point',
        coordinates: [
          21.465007960796356,
          49.74692346511107
        ]
      }
    }
  ]
};

  map: mapboxgl.Map;

  constructor() {}

  ngOnInit() {}

  public clicked(feature: any) {
    console.log(feature);
    console.log(this.map);
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
