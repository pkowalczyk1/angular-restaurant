import {Component, OnInit} from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {Dish} from "../../dish";
import {CartServiceService} from "../../services/cartService/cart-service.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
})
export class DishListComponent implements OnInit {
  dishesService: DishesServiceService;
  cartService: CartServiceService;
  perPage: number = 6;
  currPage: number = 0;
  test: number = 0;
  perPageSelect: FormControl;

  constructor(dishesService: DishesServiceService, cartService: CartServiceService) {
    this.dishesService = dishesService
    this.cartService = cartService;
    this.perPageSelect = new FormControl('')
    this.perPageSelect.setValue(6);
  }

  ngOnInit(): void {
  }

  removeDish(dish: Dish): void {
    this.dishesService.remove(dish);
    this.test++;
  }

  addedDish(): void {
    this.test++;
  }

  createRange(): number[] {
    let result: number[] = [];
    for (let i: number = 0; i<this.perPage; i++) {
      result.push(i);
    }

    return result;
  }

  previousPage(): void {
    this.currPage--;
  }

  nextPage(): void {
    this.currPage++;
  }

  changePerPage(): void {
    this.perPage = this.perPageSelect.value;
    this.currPage = 0;
  }
}
