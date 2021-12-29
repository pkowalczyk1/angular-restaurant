import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishBuyComponent } from './dish-buy.component';

describe('DishBuyComponent', () => {
  let component: DishBuyComponent;
  let fixture: ComponentFixture<DishBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
