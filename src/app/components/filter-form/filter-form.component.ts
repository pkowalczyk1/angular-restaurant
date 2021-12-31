import {Component, OnDestroy, OnInit} from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  rating: number[] = [0, 1, 2, 3, 4, 5];
  categories: string[] = [];
  types: string[] = [];
  minPrice: number = -1;
  maxPrice: number = -1;
  subscription!: Subscription;

  constructor(public dishesService: DishesServiceService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      type: [''],
      category: [''],
      priceLower: [''],
      priceUpper: [''],
      rating: ['']
    });
  }


  ngOnInit(): void {
    this.subscription = this.dishesService.data.subscribe(value => {
      let newCategories: string[] = value
        .map(dish => dish.category)
        .filter((elem, index, self) => index == self.indexOf(elem));

      let newTypes: string[] = value
        .map(dish => dish.type)
        .filter((elem, index, self) => index == self.indexOf(elem));

      let newMinPrice: number = value
        .reduce((prev, current) => (prev.price < current.price) ? prev : current).price;

      let newMaxPrice: number = value
        .reduce((prev, current) => (prev.price >current.price) ? prev : current).price;

      if (this.categories.length != newCategories.length) {
        this.categories = newCategories;
        this.form.controls["category"].reset();
      }

      if (this.types.length != newTypes.length) {
        this.types = newTypes;
        this.form.controls["type"].reset();
      }

      if (newMinPrice > this.minPrice || this.minPrice == -1) {
        this.minPrice = newMinPrice;
        this.form.controls["priceLower"].setValue(newMinPrice);
      }

      if (newMaxPrice < this.maxPrice || this.maxPrice == -1) {
        this.maxPrice = newMaxPrice;
        this.form.controls["priceUpper"].setValue(newMaxPrice);
      }

      this.formChanged();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formChanged(): void {
    let minPrice: number;
    let maxPrice: number;
    let types: string[];
    let categories: string[];
    let rating: number[];

    minPrice = this.form.value.priceLower;
    maxPrice = this.form.value.priceUpper;
    types = this.form.value.type;
    categories = this.form.value.category;
    if (types == null || types.length == 0 || !this.checkIfTypesCorrect(types)) {
      types = this.types;
    }
    if (categories == null || categories.length == 0 ||  !this.checkIfCategoriesCorrect(categories)) {
      categories = this.categories;
    }
    if (minPrice < this.minPrice) {
      minPrice = this.minPrice;
    }
    if (maxPrice > this.maxPrice) {
      maxPrice = this.maxPrice;
    }
    rating = this.form.value.rating;
    if (this.form.value.rating == null || this.form.value.rating.length == 0) {
      rating = [0, 1, 2, 3, 4, 5];
    }
    this.dishesService.changeFilters(minPrice, maxPrice, types, categories, rating);
  }

  resetCategory(): void {
    this.form.controls['category'].reset();
    this.formChanged();
  }

  resetType(): void {
    this.form.controls['type'].reset();
    this.formChanged();
  }

  resetRating(): void {
    this.form.controls['rating'].reset();
    this.formChanged();
  }

  checkIfCategoriesCorrect(categories: string[]): boolean {
    for (let category of categories) {
      if (!this.categories.includes(category)) {
        return false;
      }
    }

    return true;
  }

  checkIfTypesCorrect(types: string[]): boolean {
    for (let type of types) {
      if (!this.types.includes(type)) {
        return false;
      }
    }

    return true;
  }
}
