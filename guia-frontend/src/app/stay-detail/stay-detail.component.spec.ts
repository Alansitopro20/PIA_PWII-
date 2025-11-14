import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayDetailComponent } from './stay-detail.component';

describe('StayDetailComponent', () => {
  let component: StayDetailComponent;
  let fixture: ComponentFixture<StayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StayDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
