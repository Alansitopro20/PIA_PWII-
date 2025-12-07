import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceByCityComponent } from './place-by-city.component';

describe('PlaceByCityComponent', () => {
  let component: PlaceByCityComponent;
  let fixture: ComponentFixture<PlaceByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceByCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
