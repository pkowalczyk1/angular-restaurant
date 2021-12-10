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
  currency: string = "dollar";
  maxPrice: number;
  minPrice: number;
  borderColors: Map<Dish, string> = new Map<Dish, string>();
  borderWidth: Map<Dish, number> = new Map<Dish, number>();
  maxDish: Dish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
  minDish: Dish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? current : prev);

  constructor() {
    this.maxPrice = this.maxDish.price;
    this.minPrice = this.minDish.price;
    for (let dish of this.dishes) {
      this.borderColors.set(dish, "gray");
      this.borderWidth.set(dish, 2);
    }
    this.borderColors.set(this.maxDish, "green");
    this.borderColors.set(this.minDish, "red");
    this.borderWidth.set(this.maxDish, 5);
    this.borderWidth.set(this.minDish, 5);
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
    if (dish == this.maxDish) {
      this.maxDish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
      this.borderColors.set(this.maxDish, "green");
      this.borderWidth.set(this.maxDish, 5);
    }
    if (dish == this.minDish) {
      this.minDish = this.dishes.reduce((prev, current) => (prev.price < current.price) ? prev : current);
      this.borderColors.set(this.minDish, "red");
      this.borderWidth.set(this.minDish, 5);
    }
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
}
