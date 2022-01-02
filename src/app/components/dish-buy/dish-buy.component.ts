import {Component, Input, OnInit} from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {CartServiceService} from "../../services/cartService/cart-service.service";
import {Dish} from "../../dish";

@Component({
  selector: 'app-dish-buy',
  templateUrl: './dish-buy.component.html',
  styleUrls: ['./dish-buy.component.css']
})
export class DishBuyComponent implements OnInit {
  @Input() dish!: Dish;

  constructor(public dishesService: DishesServiceService, private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.dishesService.setCurrQuantity(this.dish);
  }

  increaseChosen(): void {
    this.dishesService.decreaseCurrQuantity(this.dish);
    this.dishesService.increaseQuantity(1);
    this.cartService.addDishToCart(this.dish, 1);
  }

  decreaseChosen(): void {
    this.dishesService.increaseCurrQuantity(this.dish);
    this.dishesService.decreaseQuantity(1);
    this.cartService.decreaseDishInCart(this.dish, 1);
  }
}
