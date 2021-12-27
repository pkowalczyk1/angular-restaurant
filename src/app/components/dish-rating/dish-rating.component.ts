import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../../dish";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";

@Component({
  selector: 'app-dish-rating',
  templateUrl: './dish-rating.component.html',
  styleUrls: ['./dish-rating.component.css']
})
export class DishRatingComponent implements OnInit {
  @Input() dish!: Dish;

  stars: number[] = [1, 2, 3, 4, 5];
  value: number = 0;
  dishesService: DishesServiceService;


  constructor(dishesService: DishesServiceService) {
    this.dishesService = dishesService;
  }

  ngOnInit(): void {
  }

  rate(star: number): void {
    this.value = star;
    this.dishesService.changeRating(this.dish, star);
  }
}
