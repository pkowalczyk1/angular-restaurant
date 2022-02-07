import { Injectable } from '@angular/core';
import { Dish } from '../../dish';
import {Observable} from "rxjs";
import {Review} from "../../review";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Rating} from "../../rating";

@Injectable({
  providedIn: 'root'
})
export class DishesServiceService {
  db: any;
  data: Observable<Dish[]>;
  totalQuantity: number = 0;
  currQuantity: Map<string, number> = new Map<string, number>();
  currency: string = "dollar";
  currencyRatio: number = 1;
  filterMinPrice!: number;
  filterMaxPrice!: number;
  filterTypes: string[] = [];
  filterCategories: string[] = [];
  filterRating: number[] = [0, 1, 2, 3, 4, 5];
  reviews: Map<string, Review[]> = new Map<string, Review[]>();

  constructor(db: AngularFirestore) {
    this.db = db;
    this.data = this.db.collection("dishes2").valueChanges({idField: "id"});
  }

  getData(): Observable<Dish[]> {
    return this.data;
  }

  removeDish(dish: Dish): void {
    this.currQuantity.delete(dish.id);
    this.db.collection("dishes2").doc(String(dish.id)).delete();
  }

  addDish(newDish: any): void {
    this.db.collection("dishes2").add({
        name: newDish.name,
        cuisine: newDish.cuisine,
        type: newDish.type,
        category: newDish.category,
        ingredients: newDish.ingredients.split(","),
        quantity: parseInt(newDish.quantity),
        description: newDish.description,
        price: parseFloat(newDish.price),
        rating: [],
        photos: newDish.photos.split(","),
        reviews: [],
      })
      .then((docRef: { id: string; }) => {
        this.currQuantity.set(docRef.id, 0)
      });
  }

  changeCurrency(): void {
    if (this.currencyRatio == 1) {
      this.currencyRatio = 0.88;
      this.currency = "euro";
    }
    else {
      this.currencyRatio = 1;
      this.currency = "dollar";
    }
  }

  changeFilters(minPrice: number, maxPrice: number, types: string[], categories: string[], rating: number[]) {
    this.filterMinPrice = minPrice;
    this.filterMaxPrice = maxPrice;
    this.filterTypes = types;
    this.filterCategories = categories;
    this.filterRating = rating;
  }

  updateDish(id: string, dish: Dish) {
    this.db.collection("dishes2").doc(id).update(dish);
  }

  getDish(id: string): Observable<Dish> {
    return this.db.collection("dishes2").doc(id).valueChanges();
  }

  addReview(dish: Dish, newReview: any): void {
    // @ts-ignore
    dish.reviews.push(newReview);
    this.db.collection("dishes2").doc(dish.id).update({reviews: dish.reviews});
  }

  rateDish(id: string, rating: Rating[]) {
    this.db.collection("dishes2").doc(id).update({rating: rating});
  }
}
