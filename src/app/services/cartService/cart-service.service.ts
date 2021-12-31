import { Injectable } from '@angular/core';
import {Dish} from "../../dish";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  dishesInCart: Dish[] = [];
  quantities: Map<string, number> = new Map<string, number>();
  totalPrices: Map<string, number> = new Map<string, number>();
  total: number = 0;

  constructor() {
  }

  addDishToCart(dish: Dish, change: number): void {
    if (this.quantities.get(dish.id) == null) {
      this.quantities.set(dish.id, change);
      this.dishesInCart.push(dish);
      this.totalPrices.set(dish.id, dish.price * change);
    }
    else {
      let curr = this.quantities.get(dish.id);
      // @ts-ignore
      this.quantities.set(dish.id, curr + change);
      // @ts-ignore
      this.totalPrices.set(dish.id, dish.price * (curr + change));
    }
    this.total += dish.price;
  }

  decreaseDishInCart(dish: Dish, change: number): void {
    let curr = this.quantities.get(dish.id);
    // @ts-ignore
    curr -= change;
    if (curr == 0) {
      this.quantities.delete(dish.id);
      this.totalPrices.delete(dish.id);
      let index: number = this.dishesInCart.indexOf(dish);
      this.dishesInCart.splice(index, 1);
    }
    else {
      // @ts-ignore
      this.quantities.set(dish.id, curr);
      // @ts-ignore
      this.totalPrices.set(dish.id, curr * dish.price)
    }
    this.total -= dish.price;
  }

  removeDishFromCart(dish: Dish): void {
    if (this.dishesInCart.includes(dish)) {
      let index: number = this.dishesInCart.indexOf(dish);
      // @ts-ignore
      this.total -= this.totalPrices.get(dish);
      this.dishesInCart.splice(index, 1);
      this.quantities.delete(dish.id);
      this.totalPrices.delete(dish.id);
    }
  }
}
