import {Component, OnDestroy, OnInit} from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {Dish} from "../../dish";
import {CartServiceService} from "../../services/cartService/cart-service.service";
import {FormControl} from "@angular/forms";
import {Position} from "../../position";
import {Observable, Subscription} from "rxjs";
import {User} from "../../user";

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
})
export class DishListComponent implements OnInit, OnDestroy {
  perPage: number = 6;
  currPage: number = 0;
  test: number = 0;
  perPageSelect: FormControl;
  cart$: Observable<User | undefined | null>;
  cart!: Position[];
  subscription!: Subscription;

  constructor(public dishesService: DishesServiceService, private cartService: CartServiceService) {
    this.perPageSelect = new FormControl('')
    this.perPageSelect.setValue(6);

    this.cart$ = this.cartService.getUser();
  }

  ngOnInit(): void {
    this.subscription = this.cart$.subscribe(value => {
      if (value != undefined) {
        this.cart = value.cart;
      }
      else {
        this.cart = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeDish(dish: Dish): void {
    this.dishesService.removeDish(dish);
    this.test++;
  }

  addedDish(): void {
    this.test++;
  }

  createRange(): number[] {
    let result: number[] = [];
    for (let i: number = 0; i<this.perPage; i++) {
      result.push(i);
    }

    return result;
  }

  previousPage(): void {
    this.currPage--;
  }

  nextPage(): void {
    this.currPage++;
  }

  changePerPage(): void {
    this.perPage = this.perPageSelect.value;
    this.currPage = 0;
  }

  getTotalQuantity(): number {
    return this.cart.map(value => value.quantity).reduce((a, b) => a + b, 0);
  }
}
