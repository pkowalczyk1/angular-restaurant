import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../dish";

@Pipe({
  name: 'dishesFilter'
})
export class DishesFilterPipe implements PipeTransform {

  transform(dishes: Dish[] | null, type: string[], minPrice: number, maxPrice: number, category: string[], test: number): Dish[] {
    console.log(dishes);
    if (!dishes) {
      return [];
    }
    if (type) {
      dishes = dishes.filter(dish => type.includes(dish.type));
    }
    if (category) {
      dishes = dishes.filter(dish => category.includes(dish.category));
    }
    dishes = dishes.filter(dish => dish.price <= maxPrice && dish.price >= minPrice);
    return dishes;
  }

}
