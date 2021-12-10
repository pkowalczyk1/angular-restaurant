import { Component, OnInit } from '@angular/core';
import {DishesServiceService} from "../dishesService/dishesService.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dishesService!: DishesServiceService;

  constructor(dishesService: DishesServiceService) {
    this.dishesService = dishesService;
  }

  ngOnInit(): void {
  }

  changeValue(): void {
    if (this.dishesService.currency == "dollar") {
      this.dishesService.currency = "euro";
      for (let dish of this.dishesService.dishes) {
        dish.price = dish.price * 0.88;
      }
    }
    else {
      this.dishesService.currency = "dollar";
      for (let dish of this.dishesService.dishes) {
        dish.price = dish.price / 0.88;
      }
    }
  }
}
