import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DishesServiceService} from "../dishesService/dishesService.service";

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  dishForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    cuisine: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  dishesService: DishesServiceService;

  constructor(dishesService: DishesServiceService) {
    this.dishesService = dishesService;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.dishesService.addDish(this.dishForm.value);
    this.dishForm.reset();
  }
}
