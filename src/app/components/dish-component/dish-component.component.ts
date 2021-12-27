import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dish} from "../../dish";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {BehaviorSubject} from "rxjs";
import {CartServiceService} from "../../services/cartService/cart-service.service";

@Component({
  selector: 'app-dish-component',
  templateUrl: './dish-component.component.html',
  styleUrls: ['./dish-component.component.css']
})
export class DishComponentComponent implements OnInit {
  @Input() dish!: Dish;
  @Output() remove: EventEmitter<Dish> = new EventEmitter<Dish>();

  plusShow: boolean = true;
  disable: boolean = true;
  dishesService: DishesServiceService;
  cartService: CartServiceService;
  currencyRatio!: BehaviorSubject<number>;
  test!: number;
  color: string;

  constructor(dishesService: DishesServiceService, cartService: CartServiceService) {
    this.dishesService = dishesService;
    this.cartService = cartService;
    this.color = "transparent";
    if (this.dishesService.getCurrQuantity(this.dish) < 3) {
      this.color = "orange";
    }
    this.currencyRatio = this.dishesService.currencyRatioObservable;
  }

  ngOnInit(): void {
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

  removeDish(): void {
    this.dishesService.decreaseQuantity(this.dish.quantity - this.dishesService.getCurrQuantity(this.dish));
    this.cartService.removeDishFromCart(this.dish);
    this.remove.emit(this.dish);
  }
}
