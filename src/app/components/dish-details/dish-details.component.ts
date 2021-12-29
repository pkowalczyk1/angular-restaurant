import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Dish} from "../../dish";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  route: ActivatedRoute;
  dishesService: DishesServiceService;
  dish!: Dish;
  errors: string[] = [];
  index: number = 0;

  reviewForm: FormGroup = new FormGroup({
    nick: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    date: new FormControl('')
  });

  constructor(route: ActivatedRoute, dishesService: DishesServiceService) {
    this.route = route;
    this.dishesService = dishesService;
  }

  ngOnInit(): void {
    let id: number = +this.route.snapshot.params["id"];
    this.dish = this.dishesService.getDishById(id);
  }

  formSubmit(): void {
    this.errors = [];
    let nick: string = this.reviewForm.value.nick;
    let title: string = this.reviewForm.value.title;
    let text: string = this.reviewForm.value.text;
    if (nick.length <= 0) {
      this.errors.push("Nie podano nicku");
    }
    if (title.length <= 0) {
      this.errors.push("Nie podano tytułu");
    }
    if (text.length < 20) {
      this.errors.push("Tekst zbyt krótki, co najmniiej 20 znaków");
    }
    if (text.length > 500) {
      this.errors.push("Tekst zbyt długi, maksymalnie 500 znaków");
    }
    if (this.errors.length == 0) {
      this.dishesService.addReview(this.dish, this.reviewForm.value);
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
}
