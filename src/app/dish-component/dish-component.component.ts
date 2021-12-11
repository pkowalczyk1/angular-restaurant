import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../dish";
import {DishesServiceService} from "../dishesService/dishesService.service";

@Component({
  selector: 'app-dish-component',
  templateUrl: './dish-component.component.html',
  styleUrls: ['./dish-component.component.css']
})
export class DishComponentComponent implements OnInit {
  @Input() dish!: Dish;

  plusShow: boolean = true;
  disable: boolean = true;
  dishesService: DishesServiceService;
  color: string;

  constructor(dishesService: DishesServiceService) {
    this.dishesService = dishesService;
    this.color = "transparent";
    if (this.dishesService.getCurrQuantity(this.dish) < 3) {
      this.color = "orange";
    }
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
  }

  removeDish(): void {
    this.dishesService.decreaseQuantity(this.dish.quantity - this.dishesService.getCurrQuantity(this.dish));
    this.dishesService.remove(this.dish);
  }
}
