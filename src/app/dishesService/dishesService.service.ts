import { Injectable } from '@angular/core';
import { Dish } from '../dish';

@Injectable({
  providedIn: 'root'
})
export class DishesServiceService {
  dishes: Dish[] = [
    {name: "Pizza", cuisine: "Włoska", type: "mięsny", category: "dania główne", ingredients: ["mąka", "mleko", "szynka", "ser", "sos"], quantity: 10, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 200},
    {name: "Spaghetti", cuisine: "Włoska", type: "mięsny", category: "dania główne", ingredients: ["makaron", "sos", "mięso"], quantity: 20, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 5.20},
    {name: "Żurek", cuisine: "Polska", type: "mięsny", category: "zupy", ingredients: ["zakwas", "kiełbasa", "ziemniaki"], quantity: 5, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 3.10},
    {name: "Burger", cuisine: "amerykańska", type: "mięsny", category: "dania główne", ingredients: ["bułka", "mięso", "sos", "sałata"], quantity: 6, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 5},
    {name: "kotlet schabowy", cuisine: "polska", type: "mięsny", category: "dania główne", ingredients: ["mięso", "ziemniaki", "surówka"], quantity: 15, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 6.2},
    {name: "jajecznica", cuisine: "międzynarodowa", type: "mięsny", category: "sniadania", ingredients: ["jajka", "boczek", "masło"], quantity: 13, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 3},
    {name: "kurczak curry", cuisine: "indyjska", type: "mięsny", category: "dania główne", ingredients: ["kurczak", "sos curry", "ryż"], quantity: 10, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 6},
    {name: "sushi", cuisine: "japońska", type: "wegetariański", category: "kolacje", ingredients: ["ryba", "ryż"], quantity: 4, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 10},
  ]
  totalQuantity: number = 0;
  currQuantities: Map<Dish, number> = new Map<Dish, number>();
  currency: string = "dollar";
  maxPrice: number;
  minPrice: number;
  maxDish: Dish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
  minDish: Dish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? current : prev);

  constructor() {
    this.maxPrice = this.maxDish.price;
    this.minPrice = this.minDish.price;
    for (let dish of this.dishes) {
      this.currQuantities.set(dish, dish.quantity);
    }
  }

  increaseQuantity(i: number): void {
    this.totalQuantity += i;
    console.log(this.totalQuantity);
  }

  decreaseQuantity(i: number): void {
    this.totalQuantity -= i;
    console.log(this.totalQuantity);
  }

  remove(dish: Dish): void {
    let index: number = this.dishes.indexOf(dish);
    this.dishes.splice(index, 1);
    this.currQuantities.delete(dish);
    if (dish == this.maxDish) {
      this.maxDish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
    }
    if (dish == this.minDish) {
      this.minDish = this.dishes.reduce((prev, current) => (prev.price < current.price) ? prev : current);
    }
  }

  addDish(newDish: any): void {
    let dish: Dish = {name: newDish.name,
      cuisine: newDish.cuisine,
      type: newDish.type,
      category: newDish.category,
      ingredients: newDish.ingredients.split(","),
      quantity: parseInt(newDish.quantity),
      description: newDish.description,
      price: parseFloat(newDish.price)
    };
    this.dishes.push(dish);
    this.currQuantities.set(dish, dish.quantity);
    this.maxDish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
    this.minDish = this.dishes.reduce((prev, current) => (prev.price < current.price) ? prev : current);
  }

  increaseCurrQuantity(dish: Dish): void {
    // @ts-ignore
    let tmp: number = this.currQuantities.get(dish);
    this.currQuantities.set(dish, tmp + 1);
  }

  decreaseCurrQuantity(dish: Dish): void {
    // @ts-ignore
    let tmp: number = this.currQuantities.get(dish);
    this.currQuantities.set(dish, tmp - 1);
  }

  getTotalQuantity(): number {
    return this.totalQuantity;
  }

  getCurrency(): string {
    return this.currency;
  }

  getDishes(): Dish[] {
    return this.dishes;
  }

  getMaxDish(): Dish {
    return this.maxDish;
  }

  getMinDish(): Dish {
    return this.minDish;
  }

  getCurrQuantity(dish: Dish): number {
    // @ts-ignore
    return this.currQuantities.get(dish);
  }
}
