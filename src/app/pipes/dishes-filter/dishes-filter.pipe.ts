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
    if (type) {
      dishes = dishes.filter(dish => type.includes(dish.type));
    }
    if (category) {
      dishes = dishes.filter(dish => category.includes(dish.category));
    }
    // @ts-ignore
    dishes = dishes.filter(dish => dish.price <= maxPrice && dish.price >= minPrice && rating.includes(dish.rating));
    return dishes;
  }
}
