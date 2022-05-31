import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MareeComponent } from './maree.component';

describe('MareeComponent', () => {
  let component: MareeComponent;
  let fixture: ComponentFixture<MareeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MareeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MareeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
