import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayByCityComponent } from './stay-by-city.component';

describe('StayByCityComponent', () => {
  let component: StayByCityComponent;
  let fixture: ComponentFixture<StayByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StayByCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StayByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
