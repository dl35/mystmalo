import { TestBed } from '@angular/core/testing';

import { MareeService } from './maree.service';

describe('MareeService', () => {
  let service: MareeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MareeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
