import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeteoComponent } from './meteo.component';

describe('MeteoComponent', () => {
  let component: MeteoComponent;
  let fixture: ComponentFixture<MeteoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
