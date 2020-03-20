import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComunnicationService {
  private focusedLantern = new BehaviorSubject<any>(null);
  private damagedLantern = new Subject<any>();

  focusedLantern$ = this.focusedLantern.asObservable();
  damagedLantern$ = this.damagedLantern.asObservable();

  setLanternFocused(lanternNumber: string) {
    this.focusedLantern.next(lanternNumber);
  }

  setLanternDamaged(lanternNumber: string) {
    this.damagedLantern.next(lanternNumber);
  }
}
