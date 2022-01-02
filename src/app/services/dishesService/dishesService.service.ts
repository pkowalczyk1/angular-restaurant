import { Injectable } from '@angular/core';
import { Dish } from '../../dish';
import {Observable} from "rxjs";
import {Review} from "../../review";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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
    this.data = this.db.collection("dishes").valueChanges({idField: "id"});
  }

  getData(): Observable<Dish[]> {
    return this.data;
  }

  increaseQuantity(i: number): void {
    this.totalQuantity += i;
  }

  decreaseQuantity(i: number): void {
    this.totalQuantity -= i;
  }

  removeDish(dish: Dish): void {
    this.currQuantity.delete(dish.id);
    this.db.collection("dishes").doc(String(dish.id)).delete();
  }

  addDish(newDish: any): void {
    this.db.collection("dishes").add({
        name: newDish.name,
        cuisine: newDish.cuisine,
        type: newDish.type,
        category: newDish.category,
        ingredients: newDish.ingredients.split(","),
        quantity: parseInt(newDish.quantity),
        description: newDish.description,
        price: parseFloat(newDish.price),
        rating: 0,
        photos: newDish.photos.split(","),
        reviews: [],
      })
      .then((docRef: { id: string; }) => {
        this.currQuantity.set(docRef.id, 0)
      });
  }

  increaseCurrQuantity(dish: Dish): void {
    if (this.currQuantity.get(dish.id) == undefined) {
      this.currQuantity.set(dish.id, 1);
    }
    else {
      // @ts-ignore
      let tmp: number = this.currQuantity.get(dish.id);
      this.currQuantity.set(dish.id, tmp - 1);
    }
  }

  decreaseCurrQuantity(dish: Dish): void {
    // @ts-ignore
    let tmp: number = this.currQuantity.get(dish.id);
    this.currQuantity.set(dish.id, tmp + 1);
  }

  setCurrQuantity(dish: Dish): void {
    if (this.currQuantity.get(dish.id) == undefined) {
      this.currQuantity.set(dish.id, 0);
    }
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
    this.db.collection("dishes").doc(id).update(dish);
  }

  getTotalQuantity(): number {
    return this.totalQuantity;
  }

  getCurrQuantity(dish: Dish): number {
    // @ts-ignore
    return this.currQuantity.get(dish.id);
  }

  getDish(id: string): Observable<Dish> {
    return this.db.collection("dishes").doc(id).valueChanges();
  }

  addReview(dish: Dish, newReview: any): void {
    let review: Review = {
      owner: newReview.nick,
      title: newReview.title,
      text: newReview.text,
      date: newReview.date,
    };
    dish.reviews.push(review);
    if (this.reviews.get(dish.id) == undefined) {
      let newArr: Review[] = [];
      newArr.push(review);
      this.reviews.set(dish.id, newArr);
    }
    else {
      // @ts-ignore
      let arr: Review[] = this.reviews.get(dish.id);
      arr.push(review);
      this.reviews.set(dish.id, arr);
    }
  }

  getReviews(dish: Dish): Review[] {
    if (this.reviews.get(dish.id) == undefined) {
      return [];
    }
    // @ts-ignore
    return this.reviews.get(dish.id)
  }
}
