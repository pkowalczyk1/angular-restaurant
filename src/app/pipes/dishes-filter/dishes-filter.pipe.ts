import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../../dish";

@Pipe({
  name: 'dishesFilter'
})
export class DishesFilterPipe implements PipeTransform {

  transform(dishes: Dish[] | null, type: string[] | null, minPrice: number | null, maxPrice: number | null, category: string[] | null, rating: number[] | null, test: number): Dish[] {
    if (!dishes) {
      return [];
    }
    if (type && type.length != 0) {
      dishes = dishes.filter(dish => type.includes(dish.type));
    }
    if (category && category.length != 0) {
      dishes = dishes.filter(dish => category.includes(dish.category));
    }

    // @ts-ignore
    dishes = dishes.filter(dish => {
      let ratingCount: number = dish.rating.reduce((a, b) => a + 1, 0);
      let ratingMean: number;

      if (ratingCount == 0) {
        ratingMean = 0;
      }
      else {
        ratingMean = Math.ceil(dish.rating.map(value => value.value).reduce((a, b) => a + b) / ratingCount);
      }

      // @ts-ignore
      return dish.price <= maxPrice && dish.price >= minPrice && rating.includes(ratingMean);
    });
    return dishes;
  }
}
