import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          isDamaged: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.391003131866455, 49.82077905815968]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: true
        },
        geometry: {
          type: 'Point',
          coordinates: [21.39127403497696, 49.821237640961904]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.39104336500168, 49.82172736798523]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.39028161764145, 49.82200943465698]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.39022797346115, 49.821832926870904]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.390737593173977, 49.82160623455397]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.390965580940247, 49.821254945888214]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.390737593173977, 49.82083962594872]
        }
      }
    ]
  };

  map: mapboxgl.Map;
  gmina: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  lanternNumber = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('assets/gmina-brzyska.txt', { responseType: 'text' })
      .subscribe(data => {
        this.gmina = JSON.parse(data);
      });
  }

  public clicked(feature: any) {
    feature.properties.isDamaged = true;
    this.lanternNumber =  feature.geometry.coordinates[0];
  }

  mapLoad(ee: any) {
    this.map = ee;
    this.map.setMaxZoom(18);
    this.map.setMinZoom(11);

    this.map.addSource('some id', {
      type: 'geojson',
      data: this.gmina
    });

    this.map.on('zoom', (e: any) => {
      const iconSize = e.target.transform._zoom * 5 - 40;
      document.querySelector('body').style.cssText =
        '--my-var:' + iconSize + 'px';
    });
  }
}
