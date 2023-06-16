import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaquebotsComponent } from './paquebots.component';

describe('PaquebotsComponent', () => {
  let component: PaquebotsComponent;
  let fixture: ComponentFixture<PaquebotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaquebotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaquebotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
