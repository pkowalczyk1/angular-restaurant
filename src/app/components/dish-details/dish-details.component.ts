import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Dish} from "../../dish";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {CartServiceService} from "../../services/cartService/cart-service.service";
import {Position} from "../../position";
import {User} from "../../user";
import {Review} from "../../review";

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit, OnDestroy {
  dish!: Dish;
  errors: string[] = [];
  id!: string;
  index: number = 0;
  cart$: Observable<User | undefined | null>;
  cart!: Position[];
  uid!: string;
  history!: string[];
  banned!: boolean;
  username!: string;
  adminOrManager!: boolean;
  subscription1!: Subscription;
  subscription2!: Subscription;

  reviewForm: FormGroup = new FormGroup({
    nick: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    date: new FormControl('')
  });

  constructor(private route: ActivatedRoute, public dishesService: DishesServiceService, private cartService: CartServiceService) {
    this.cart$ = this.cartService.getUser();
  }

  ngOnInit(): void {
    let id: string = this.route.snapshot.params["id"];
    this.subscription1 = this.dishesService.getDish(id).subscribe(value => {
      this.dish = value;
      this.dish.id = id;
    });

    this.subscription2 = this.cart$.subscribe(value => {
      if (value != undefined) {
        this.cart = value.cart;
        this.uid = value.uid;
        if (value.history != undefined) {
          this.history = value.history;
        }
        else {
          this.history = [];
        }
        this.banned = value.roles.banned;
        this.adminOrManager = value.roles.admin || value.roles.manager;
        this.username = value.displayName;
      }
      else {
        this.cart = [];
        this.uid = "";
        this.history = [];
        this.banned = false;
        this.adminOrManager = false;
        this.username = "";
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  formSubmit(): void {
    this.errors = [];
    let title: string = this.reviewForm.value.title;
    let text: string = this.reviewForm.value.text;

    if (title.length <= 0) {
      this.errors.push("Nie podano tytułu");
    }
    if (text.length < 20) {
      this.errors.push("Tekst zbyt krótki, co najmniej 20 znaków");
    }
    if (text.length > 500) {
      this.errors.push("Tekst zbyt długi, maksymalnie 500 znaków");
    }
    if (this.errors.length == 0) {
      let newReview: Review = {
        owner: this.username,
        title: this.reviewForm.value.title,
        date: this.reviewForm.value.date,
        text: this.reviewForm.value.text,
      }

      this.dishesService.addReview(this.dish, newReview);
      this.reviewForm.reset();
    }
  }

  nextPhoto(): void {
    this.index++;
    this.index %= this.dish.photos.length;
  }

  prevPhoto(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.dish.photos.length + this.index;
    }
    else {
      this.index %= this.dish.photos.length;
    }
  }

  hasBought(): boolean {
    return this.history.includes(this.dish.id);
  }

  countRatingMean(): number {
    let ratingCount: number = this.dish.rating.reduce((a, b) => a + 1, 0);
    let ratingMean: number;

    if (ratingCount == 0) {
      ratingMean = 0;
    }
    else {
      ratingMean = Math.ceil(this.dish.rating.map(value => value.value).reduce((a, b) => a + b) / ratingCount);
    }

    return ratingMean;
  }
}
