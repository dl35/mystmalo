import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebcamManageComponent } from './webcam-manage.component';

describe('WebcamManageComponent', () => {
  let component: WebcamManageComponent;
  let fixture: ComponentFixture<WebcamManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcamManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
