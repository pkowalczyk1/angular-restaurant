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

  plusShow: boolean = true;
  disable: boolean = false;
  dishesService: DishesServiceService;
  cartService: CartServiceService;
  color: string;

  constructor(dishesService: DishesServiceService, cartService: CartServiceService) {
    this.dishesService = dishesService;
    this.cartService = cartService;
    this.color = "transparent";
    if (this.dishesService.getCurrQuantity(this.dish) < 3) {
      this.color = "orange";
    }
  }

  ngOnInit(): void {
    this.plusShow = this.dishesService.getCurrQuantity(this.dish) > 0;
    this.disable = this.dishesService.getCurrQuantity(this.dish) >= this.dish.quantity;

    this.color = "transparent";
    if (this.dishesService.getCurrQuantity(this.dish) < 3) {
      this.color = "orange";
    }
  }

  increaseChosen(): void {
    if (this.dishesService.getCurrQuantity(this.dish) == this.dish.quantity) {
      this.disable = false;
    }
    this.dishesService.decreaseCurrQuantity(this.dish);
    if (this.dishesService.getCurrQuantity(this.dish) < 3) {
      this.color = "orange";
    }
    if (this.dishesService.getCurrQuantity(this.dish) == 0) {
      this.plusShow = false;
    }
    this.dishesService.increaseQuantity(1);
    this.cartService.addDishToCart(this.dish, 1);
  }

  decreaseChosen(): void {
    if (this.dishesService.getCurrQuantity(this.dish) == 0) {
      this.plusShow = true;
    }
    this.dishesService.increaseCurrQuantity(this.dish);
    if (this.dishesService.getCurrQuantity(this.dish) >= 3) {
      this.color = "transparent";
    }
    if (this.dishesService.getCurrQuantity(this.dish) == this.dish.quantity) {
      this.disable = true;
    }
    this.dishesService.decreaseQuantity(1);
    this.cartService.decreaseDishInCart(this.dish, 1);
  }
}
