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
  @Input() currQuantity!: number;

  plusShow: boolean = true;
  disable: boolean = true;
  dishesService: DishesServiceService;
  color: string;

  constructor(dishesService: DishesServiceService) {
    this.dishesService = dishesService;
    this.color = "transparent";
    if (this.currQuantity < 3) {
      this.color = "orange";
    }
  }

  ngOnInit(): void {
  }

  increaseChosen(): void {
    if (this.currQuantity == this.dish.quantity) {
      this.disable = false;
    }
    this.currQuantity -= 1;
    if (this.currQuantity < 3) {
      this.color = "orange";
    }
    if (this.currQuantity == 0) {
      this.plusShow = false;
    }
    this.dishesService.increaseQuantity(1);
  }

  decreaseChosen(): void {
    if (this.currQuantity == 0) {
      this.plusShow = true;
    }
    this.currQuantity += 1;
    if (this.currQuantity >= 3) {
      this.color = "transparent";
    }
    if (this.currQuantity == this.dish.quantity) {
      this.disable = true;
    }
    this.dishesService.decreaseQuantity(1);
  }

  removeDish(): void {
    this.dishesService.decreaseQuantity(this.dish.quantity - this.currQuantity);
    this.dishesService.remove(this.dish);
  }
}
