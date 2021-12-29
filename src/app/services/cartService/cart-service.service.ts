import { Injectable } from '@angular/core';
import {Dish} from "../../dish";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  dishesInCart: Dish[] = [];
  quantities: Map<Dish, number> = new Map<Dish, number>();
  totalPrices: Map<Dish, number> = new Map<Dish, number>();
  total: number = 0;

  constructor() {
  }

  addDishToCart(dish: Dish, change: number): void {
    if (this.quantities.get(dish) == null) {
      this.quantities.set(dish, change);
      this.dishesInCart.push(dish);
      this.totalPrices.set(dish, dish.price * change);
    }
    else {
      let curr = this.quantities.get(dish);
      // @ts-ignore
      this.quantities.set(dish, curr + change);
      // @ts-ignore
      this.totalPrices.set(dish, dish.price * (curr + change));
    }
    this.total += dish.price;
  }

  decreaseDishInCart(dish: Dish, change: number): void {
    let curr = this.quantities.get(dish);
    // @ts-ignore
    curr -= change;
    if (curr == 0) {
      this.quantities.delete(dish);
      this.totalPrices.delete(dish);
      let index: number = this.dishesInCart.indexOf(dish);
      this.dishesInCart.splice(index, 1);
    }
    else {
      // @ts-ignore
      this.quantities.set(dish, curr);
      // @ts-ignore
      this.totalPrices.set(dish, curr * dish.price)
    }
    this.total -= dish.price;
  }

  removeDishFromCart(dish: Dish): void {
    if (this.dishesInCart.includes(dish)) {
      let index: number = this.dishesInCart.indexOf(dish);
      // @ts-ignore
      this.total -= this.totalPrices.get(dish);
      this.dishesInCart.splice(index, 1);
      this.quantities.delete(dish);
      this.totalPrices.delete(dish);
    }
  }
}
