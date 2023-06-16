import { TestBed } from '@angular/core/testing';

import { PaquebotsService } from './paquebots.service';

describe('PaquebotsService', () => {
  let service: PaquebotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaquebotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
