import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunnicationService {
  private focusedLantern = new BehaviorSubject<any>(null);
  private damagedLantern = new Subject<any>();
  private flyToLocation = new Subject<any>();

  focusedLantern$ = this.focusedLantern.asObservable();
  damagedLantern$ = this.damagedLantern.asObservable();
  flyToLocation$ = this.flyToLocation.asObservable();

  setLanternFocused(lanternNumber: string) {
    this.focusedLantern.next(lanternNumber);
  }

  setLanternDamaged(lanternNumber: string) {
    this.damagedLantern.next(lanternNumber);
  }

  setFlyToLocation(lanternCord: any) {
    this.flyToLocation.next(lanternCord);
  }

  // tslint:disable-next-line: member-ordering
  public lanterns = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          isDamaged: false,
          notificatedBy: null,
          contactNumber: null,
          isHighlighted: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.391003131866455, 49.82077905815968]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: true,
          notificatedBy: 'Jan Kowalski',
          contactNumber: '525352352',
          isHighlighted: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.39127403497696, 49.821237640961904]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false,
          notificatedBy: null,
          contactNumber: null,
          isHighlighted: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.39104336500168, 49.82172736798523]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false,
          notificatedBy: null,
          contactNumber: null,
          isHighlighted: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.39028161764145, 49.82200943465698]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false,
          notificatedBy: null,
          contactNumber: null,
          isHighlighted: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.39022797346115, 49.821832926870904]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false,
          notificatedBy: null,
          contactNumber: null,
          isHighlighted: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.390737593173977, 49.82160623455397]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false,
          notificatedBy: null,
          contactNumber: null,
          isHighlighted: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.390965580940247, 49.821254945888214]
        }
      },
      {
        type: 'Feature',
        properties: {
          isDamaged: false,
          notificatedBy: null,
          contactNumber: null,
          isHighlighted: false
        },
        geometry: {
          type: 'Point',
          coordinates: [21.390737593173977, 49.82083962594872]
        }
      }
    ]
  };
}
