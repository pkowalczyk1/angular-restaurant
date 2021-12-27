import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCartComponent } from './dish-cart.component';

describe('DishCartComponent', () => {
  let component: DishCartComponent;
  let fixture: ComponentFixture<DishCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
