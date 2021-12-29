import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dish} from "../../dish";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {CartServiceService} from "../../services/cartService/cart-service.service";

@Component({
  selector: 'app-dish-component',
  templateUrl: './dish-component.component.html',
  styleUrls: ['./dish-component.component.css']
})
export class DishComponentComponent implements OnInit {
  @Input() dish!: Dish;
  @Output() remove: EventEmitter<Dish> = new EventEmitter<Dish>();

  dishesService: DishesServiceService;
  cartService: CartServiceService;
  test!: number;

  constructor(dishesService: DishesServiceService, cartService: CartServiceService) {
    this.dishesService = dishesService;
    this.cartService = cartService;
  }

  ngOnInit(): void {
  }

  removeDish(): void {
    this.dishesService.decreaseQuantity(this.dish.quantity - this.dishesService.getCurrQuantity(this.dish));
    this.cartService.removeDishFromCart(this.dish);
    this.remove.emit(this.dish);
  }
}
