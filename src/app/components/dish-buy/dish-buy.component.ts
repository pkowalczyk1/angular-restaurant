import {Component, Input, OnInit} from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {CartServiceService} from "../../services/cartService/cart-service.service";
import {Dish} from "../../dish";
import {Position} from "../../position";

@Component({
  selector: 'app-dish-buy',
  templateUrl: './dish-buy.component.html',
  styleUrls: ['./dish-buy.component.css']
})
export class DishBuyComponent implements OnInit {
  @Input() dish!: Dish;
  @Input() cart!: Position[];

  constructor(public dishesService: DishesServiceService, private cartService: CartServiceService) {
  }

  ngOnInit(): void {
  }

  increaseChosen(): void {
    if (this.cart.filter(value => value.dishId == this.dish.id).length != 0) {
      this.cart.filter(value => value.dishId == this.dish.id).map(value => value.quantity++);
    }
    else {
      this.cart.push({dishId: this.dish.id, quantity: 1});
    }

    this.cartService.changeCart(this.cart);
  }

  decreaseChosen(): void {
    let decreased: Position = this.cart.filter(value => value.dishId == this.dish.id)[0];
    if (decreased.quantity == 1) {
      this.cart.splice(this.cart.indexOf(decreased), 1);
    }
    else {
      this.cart.filter(value => value.dishId == this.dish.id).map(value => value.quantity--);
    }

    this.cartService.changeCart(this.cart);
  }

  getDishQuantity(): number {
    if (this.cart.filter(value => value.dishId == this.dish.id).length != 0) {
      return this.cart.filter(value => value.dishId == this.dish.id)[0].quantity;
    }
    else {
      return 0;
    }
  }
}
