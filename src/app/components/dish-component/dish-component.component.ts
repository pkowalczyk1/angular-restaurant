import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Dish} from "../../dish";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {CartServiceService} from "../../services/cartService/cart-service.service";
import {Subscription} from "rxjs";
import {AuthServiceService} from "../../services/authService/auth-service.service";

@Component({
  selector: 'app-dish-component',
  templateUrl: './dish-component.component.html',
  styleUrls: ['./dish-component.component.css']
})
export class DishComponentComponent implements OnInit, OnDestroy {
  @Input() dish!: Dish;
  @Output() remove: EventEmitter<Dish> = new EventEmitter<Dish>();

  maxPrice!: number;
  minPrice!: number;
  test!: number;
  subscription!: Subscription;

  constructor(public dishesService: DishesServiceService, private cartService: CartServiceService, public authService: AuthServiceService) { }

  ngOnInit(): void {
    this.dishesService.setCurrQuantity(this.dish);
    this.subscription = this.dishesService.getData().subscribe(value => {
      this.minPrice = value
        .reduce((prev, current) => (prev.price < current.price) ? prev : current).price;

      this.maxPrice = value
        .reduce((prev, current) => (prev.price > current.price) ? prev : current).price;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeDish(): void {
    this.dishesService.decreaseQuantity(this.dishesService.getCurrQuantity(this.dish));
    this.cartService.removeDishFromCart(this.dish);
    this.remove.emit(this.dish);
  }
}
