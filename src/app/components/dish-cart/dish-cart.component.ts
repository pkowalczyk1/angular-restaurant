import { Component, OnInit } from '@angular/core';
import {Dish} from "../../dish";
import {CartServiceService} from "../../services/cartService/cart-service.service";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";

@Component({
  selector: 'app-dish-cart',
  templateUrl: './dish-cart.component.html',
  styleUrls: ['./dish-cart.component.css']
})
export class DishCartComponent implements OnInit {
  cartService: CartServiceService;
  dishesService: DishesServiceService;
  totalPrices!: Map<Dish, number>;

  constructor(cartService: CartServiceService, dishesService: DishesServiceService) {
    this.dishesService = dishesService;
    this.cartService = cartService;
  }

  ngOnInit(): void {
  }
}
