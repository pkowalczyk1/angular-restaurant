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
  totalPrices!: Map<Dish, number>;

  constructor(public cartService: CartServiceService, public dishesService: DishesServiceService) { }

  ngOnInit(): void {
  }
}
