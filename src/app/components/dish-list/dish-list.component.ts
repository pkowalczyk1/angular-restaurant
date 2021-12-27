import {Component, OnInit} from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {Dish} from "../../dish";
import {BehaviorSubject} from "rxjs";
import {CartServiceService} from "../../services/cartService/cart-service.service";

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
})
export class DishListComponent implements OnInit {
  dishes: BehaviorSubject<Dish[]>;
  filterMinPrice: BehaviorSubject<number>;
  filterMaxPrice: BehaviorSubject<number>;
  filterTypes: BehaviorSubject<string[]>;
  filterCategories: BehaviorSubject<string[]>;
  filterRating: BehaviorSubject<number[]>;
  cartListObservable: BehaviorSubject<Dish[]>;
  dishList!: Dish[];
  test: number = 0;

  constructor(private dishesService: DishesServiceService, private cartService: CartServiceService) {
    this.dishes = dishesService.dishesObservable;
    this.filterMaxPrice = dishesService.filterMaxPriceObservable;
    this.filterMinPrice = dishesService.filterMinPriceObservable;
    this.filterTypes = dishesService.filterTypesObservable;
    this.filterCategories = dishesService.filterCategoriesObservable;
    this.filterRating = dishesService.filterRatingObservable;
    this.cartListObservable = cartService.dishesInCartObservable;
    this.dishes.subscribe((value) => {
      this.dishList = value;
    });
  }

  ngOnInit(): void {
  }

  removeDish(dish: Dish): void {
    this.dishesService.remove(dish);
    this.test++;
  }

  addedDish(): void {
    this.test++;
  }
}
