import { Injectable } from '@angular/core';
import {Dish} from "../../dish";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, take} from "rxjs";
import {Position} from "../../position";
import {AuthServiceService} from "../authService/auth-service.service";
import {User} from "../../user";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  dishesInCart: Dish[] = [];
  quantities: Map<string, number> = new Map<string, number>();
  totalPrices: Map<string, number> = new Map<string, number>();
  total: number = 0;

  db: any;

  constructor(db: AngularFirestore, private authService: AuthServiceService) {
    this.db = db;
  }

  getUser(): Observable<User | null | undefined> {
    return this.authService.currentUser;
  }

  changeCart(positions: Position[]): void {
    this.db.collection("users").doc(this.authService.getUid()).update({cart: positions});
  }

  submitCart(cart: Position[], currHist: string[]): void {
    let dishIds: string[] = cart.map(value => value.dishId);
    console.log(dishIds);
    let tmp: string[] = currHist.concat(dishIds);
    console.log(tmp);
    currHist = tmp.filter((item, index) => tmp.indexOf(item) === index);
    console.log(tmp);
    this.db.collection("users").doc(this.authService.getUid()).update({history: currHist, cart: []});
  }

  removeDishFromCart(dish: Dish) {
    this.db.collection("users").valueChanges().pipe(take(2)).subscribe((users: User[]) => {
      for (let user of users) {
        if (user.cart.map(value => value.dishId).includes(dish.id)) {
          let toDelete: Position = user.cart.filter(value => value.dishId == dish.id)[0];
          user.cart.splice(user.cart.indexOf(toDelete), 1);
          this.db.collection("users").doc(user.uid).update({cart: user.cart});
        }
      }
    });
  }
}
