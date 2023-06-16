import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouillageComponent } from './mouillage.component';

describe('MouillageComponent', () => {
  let component: MouillageComponent;
  let fixture: ComponentFixture<MouillageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouillageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MouillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
