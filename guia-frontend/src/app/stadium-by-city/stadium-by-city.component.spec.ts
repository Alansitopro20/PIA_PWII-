import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumByCityComponent } from './stadium-by-city.component';

describe('StadiumByCityComponent', () => {
  let component: StadiumByCityComponent;
  let fixture: ComponentFixture<StadiumByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StadiumByCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadiumByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
