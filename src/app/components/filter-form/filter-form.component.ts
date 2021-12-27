import { Component, OnInit } from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {BehaviorSubject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {
  types: string[] = [];
  categories: string[] = [];
  maxPrice: BehaviorSubject<number>;
  minPrice: BehaviorSubject<number>;
  maxPriceVar!: number;
  minPriceVar!: number;
  form: FormGroup;
  rating: number[] = [0, 1, 2, 3, 4, 5];
  currencyRatioObservable: BehaviorSubject<number>;
  currencyRatio: number = 1;

  constructor(private dishesService: DishesServiceService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      type: [''],
      category: [''],
      priceLower: [''],
      priceUpper: [''],
      rating: ['']
    })

    this.minPrice = this.dishesService.minPriceObservable;
    this.maxPrice = this.dishesService.maxPriceObservable;
    this.currencyRatioObservable = this.dishesService.currencyRatioObservable;
    this.minPrice.subscribe((value) => {
      this.minPriceVar = value;
      this.resetPrice();
    });
    this.maxPrice.subscribe((value) => {
      this.maxPriceVar = value;
      this.resetPrice();
    });

    this.currencyRatioObservable.subscribe((value) => {
      this.currencyRatio = value;
      this.updatePriceDisplay(this.form.value.priceLower, this.form.value.priceUpper);
    });

    this.dishesService = dishesService;
    this.dishesService.dishesObservable.subscribe((value) => {
      let typesTmp: string[] = []
      let categoriesTmp: string[] = [];
      for (let dish of value) {
        if (!typesTmp.includes(dish.type))
          typesTmp.push(dish.type);
        if (!categoriesTmp.includes(dish.category)) {
          categoriesTmp.push(dish.category);
        }
      }
      if (this.types.length != typesTmp.length) {
        this.resetType();
        this.types = typesTmp;
      }
      if (this.categories.length != categoriesTmp.length) {
        this.resetCategory();
        this.categories = categoriesTmp;
      }
      this.formChanged();
    });
  }

  ngOnInit(): void {
    this.resetCategory();
    this.resetType();
    this.resetPrice();
    this.updatePriceDisplay(this.minPriceVar, this.maxPriceVar);
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
    if (types == null || types.length == 0) {
      types = this.types;
    }
    if (categories == null || categories.length == 0) {
      categories = this.categories;
    }
    rating = this.form.value.rating;
    if (this.form.value.rating == null || this.form.value.rating.length == 0) {
      rating = [0, 1, 2, 3, 4, 5];
    }
    this.updatePriceDisplay(minPrice, maxPrice);
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

  resetPrice(): void {
    this.form.controls['priceLower'].reset();
    this.form.controls['priceLower'].reset();
    this.form.controls['priceLower'].setValue(this.minPriceVar * this.currencyRatio);
    this.form.controls['priceUpper'].setValue(this.maxPriceVar * this.currencyRatio);
    this.formChanged();
  }

  updatePriceDisplay(minPrice: number, maxPrice: number): void {
    if (document.getElementById("min-price-val") != null) {
      // @ts-ignore
      document.getElementById("min-price-val").innerText = (minPrice * this.currencyRatio).toFixed(2)
    }
    if (document.getElementById("max-price-val") != null) {
      // @ts-ignore
      document.getElementById("max-price-val").innerText = (maxPrice * this.currencyRatio).toFixed(2)
    }
  }
}
