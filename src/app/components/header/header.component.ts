import { Component, OnInit } from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dishesService: DishesServiceService;

  constructor(dishesService: DishesServiceService) {
    this.dishesService = dishesService;
  }

  ngOnInit(): void {
  }

  changeValue(): void {
    this.dishesService.changeCurrency();
  }
}
