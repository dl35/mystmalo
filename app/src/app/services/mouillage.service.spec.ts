import { TestBed } from '@angular/core/testing';

import { MouillageService } from './mouillage.service';

describe('MouillageService', () => {
  let service: MouillageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouillageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
