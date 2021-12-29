import {Component, OnDestroy, OnInit} from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit, OnDestroy {
  dishesService: DishesServiceService;
  form: FormGroup;
  rating: number[] = [0, 1, 2, 3, 4, 5];
  currencyRatio: number = 1;
  minPriceSubject: Subject<number>;
  maxPriceSubject: Subject<number>;

  constructor(dishesService: DishesServiceService, private formBuilder: FormBuilder) {
    this.dishesService = dishesService;
    this.form = this.formBuilder.group({
      type: [''],
      category: [''],
      priceLower: [''],
      priceUpper: [''],
      rating: ['']
    })

    this.minPriceSubject = dishesService.minPriceSubject;
    this.maxPriceSubject = dishesService.maxPriceSubject;

    this.form.controls["priceLower"].setValue(dishesService.minPrice);
    this.form.controls["priceUpper"].setValue(dishesService.maxPrice);

    this.minPriceSubject.subscribe(() => {
      this.form.controls["priceLower"].setValue(dishesService.minPrice);
      this.form.controls["priceUpper"].setValue(dishesService.maxPrice);
      this.formChanged();

    });

    this.maxPriceSubject.subscribe(() => {
      this.form.controls["priceUpper"].setValue(dishesService.maxPrice);
      this.form.controls["priceLower"].setValue(dishesService.minPrice);
      this.formChanged();
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.minPriceSubject.unsubscribe();
    // this.maxPriceSubject.unsubscribe();
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
      types = this.dishesService.types;
    }
    if (categories == null || categories.length == 0 ||  !this.checkIfCategoriesCorrect(categories)) {
      categories = this.dishesService.categories;
    }
    if (minPrice < this.dishesService.minPrice) {
      minPrice = this.dishesService.minPrice;
    }
    if (maxPrice > this.dishesService.maxPrice) {
      maxPrice = this.dishesService.maxPrice;
    }
    rating = this.form.value.rating;
    if (this.form.value.rating == null || this.form.value.rating.length == 0) {
      rating = [0, 1, 2, 3, 4, 5];
    }
    this.dishesService.changeFilters(minPrice / this.currencyRatio, maxPrice / this.currencyRatio, types, categories, rating);
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
      if (!this.dishesService.categories.includes(category)) {
        return false;
      }
    }

    return true;
  }

  checkIfTypesCorrect(types: string[]): boolean {
    for (let type of types) {
      if (!this.dishesService.types.includes(type)) {
        return false;
      }
    }

    return true;
  }
}
