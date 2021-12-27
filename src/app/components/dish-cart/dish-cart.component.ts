import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Dish} from "../../dish";
import {CartServiceService} from "../../services/cartService/cart-service.service";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";

@Component({
  selector: 'app-dish-cart',
  templateUrl: './dish-cart.component.html',
  styleUrls: ['./dish-cart.component.css']
})
export class DishCartComponent implements OnInit {
  cartObservable: BehaviorSubject<Dish[]>;
  quantitiesObservable: BehaviorSubject<Map<Dish, number>>;
  totalPricesObservable: BehaviorSubject<Map<Dish, number>>;
  currencyRatioObservable: BehaviorSubject<number>;
  currency: BehaviorSubject<string>;
  totalPrices!: Map<Dish, number>;
  sum: number = 0;

  constructor(private cartService: CartServiceService, private dishesService: DishesServiceService) {
    this.cartObservable = cartService.dishesInCartObservable;
    this.quantitiesObservable = cartService.quantitiesObservable;
    this.totalPricesObservable = cartService.totalPricesObservable;
    this.currencyRatioObservable = dishesService.currencyRatioObservable;
    this.currency = dishesService.currencyObservable;
    this.totalPricesObservable.subscribe((value) => {
      this.totalPrices = value;
      this.sum = 0;
      for (let key of value.keys()) {
        // @ts-ignore
        this.sum += value.get(key);
      }
    })
  }

  ngOnInit(): void {
  }

}
