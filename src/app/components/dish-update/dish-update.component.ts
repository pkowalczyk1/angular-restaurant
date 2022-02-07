import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Dish} from "../../dish";

@Component({
  selector: 'app-dish-update',
  templateUrl: './dish-update.component.html',
  styleUrls: ['./dish-update.component.css']
})
export class DishUpdateComponent implements OnInit, OnDestroy {
  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    cuisine: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    photos: new FormControl('', Validators.required)
  });

  subscription!: Subscription;
  id!: string;
  dish!: Dish;

  constructor(private dishesService: DishesServiceService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.subscription = this.dishesService.getDish(this.id).subscribe(value => {
      this.dish = value;
      this.updateForm.controls["cuisine"].setValue(value.cuisine);
      this.updateForm.controls["type"].setValue(value.type);
      this.updateForm.controls["name"].setValue(value.name);
      this.updateForm.controls["category"].setValue(value.category);
      this.updateForm.controls["ingredients"].setValue(value.ingredients.join(","));
      this.updateForm.controls["quantity"].setValue(value.quantity);
      this.updateForm.controls["price"].setValue(value.price);
      this.updateForm.controls["description"].setValue(value.description);
      this.updateForm.controls["photos"].setValue(value.photos.join(","));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    let updated: Dish = {
      id: this.id,
      name: this.updateForm.value.name,
      cuisine: this.updateForm.value.cuisine,
      type: this.updateForm.value.type,
      category: this.updateForm.value.category,
      quantity: parseInt(this.updateForm.value.quantity),
      price: parseFloat(this.updateForm.value.price),
      description: this.updateForm.value.description,
      photos: this.updateForm.value.photos.split(","),
      reviews: [],
      rating: this.dish.rating,
      ingredients: this.updateForm.value.ingredients.split(",")
    }

    this.dishesService.updateDish(this.id, updated);
    this.router.navigate(["/list"]);
  }
}
