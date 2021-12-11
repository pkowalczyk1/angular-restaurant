import { Component, OnInit } from '@angular/core';
import {DishesServiceService} from "../dishesService/dishesService.service";
import {Dish} from "../dish";

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Dish[];
  plusHide: boolean = true;

  constructor(dishesService: DishesServiceService) {
    this.dishes = dishesService.getDishes();
  }

  ngOnInit(): void {
  }
}
