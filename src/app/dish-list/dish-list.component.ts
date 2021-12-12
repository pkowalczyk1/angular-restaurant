import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DishesServiceService} from "../dishesService/dishesService.service";
import {Dish} from "../dish";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DishListComponent implements OnInit {
  // @ts-ignore
  dishes: Observable<Dish[]>;
  test: number = 0;

  constructor(private dishesService: DishesServiceService) {
  }

  getDishes(): void {
    this.dishes = this.dishesService.getDishes();
  }

  ngOnInit(): void {
    this.getDishes();
  }

  removeDish(dish: Dish): void {
    this.dishesService.remove(dish);
    this.test++;
  }
}
