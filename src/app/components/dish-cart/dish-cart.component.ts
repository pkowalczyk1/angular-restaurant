import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from "../../dish";
import {CartServiceService} from "../../services/cartService/cart-service.service";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {Observable, Subscription} from "rxjs";
import {User} from "../../user";
import {Position} from "../../position";

@Component({
  selector: 'app-dish-cart',
  templateUrl: './dish-cart.component.html',
  styleUrls: ['./dish-cart.component.css']
})
export class DishCartComponent implements OnInit, OnDestroy {
  totalPrices!: Map<Dish, number>;

  cart$: Observable<User | undefined | null>;
  cart!: Position[];
  dishes$: Observable<Dish[]>;
  dishes!: Dish[];
  history!: string[];
  subscription1!: Subscription;
  subscription2!: Subscription;

  constructor(public cartService: CartServiceService, public dishesService: DishesServiceService) {
    this.cart$ = this.cartService.getUser();
    this.dishes$ = this.dishesService.getData();
  }

  ngOnInit(): void {
    this.subscription1 = this.cart$.subscribe(value => {
      if (value != undefined) {
        this.cart = value.cart;
        if (value.history != undefined) {
          this.history = value.history;
        }
        else {
          this.history = [];
        }
      }
      else {
        this.cart = [];
        this.history = [];
      }
    });

    this.subscription2 = this.dishes$.subscribe(value => {
      this.dishes = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  getDish(id: string): Dish {
    return this.dishes.filter(value => value.id == id)[0];
  }

  countCart(): number {
    return this.cart
      .map(value => value.quantity * this.getDish(value.dishId).price)
      .reduce((a, b) => a + b, 0);
  }
}
