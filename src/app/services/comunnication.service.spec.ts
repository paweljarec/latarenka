/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComunnicationService } from './comunnication.service';

describe('Service: Comunnication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunnicationService]
    });
  });

  it('should ...', inject([ComunnicationService], (service: ComunnicationService) => {
    expect(service).toBeTruthy();
  }));
});
