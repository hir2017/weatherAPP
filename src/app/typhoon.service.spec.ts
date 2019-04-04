import { TestBed } from '@angular/core/testing';

import { TyphoonService } from './typhoon.service';

describe('TyphoonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TyphoonService = TestBed.get(TyphoonService);
    expect(service).toBeTruthy();
  });
});
