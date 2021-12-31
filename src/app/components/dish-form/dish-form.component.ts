import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  @Output() add: EventEmitter<void> = new EventEmitter<void>();

  dishForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    cuisine: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    photos: new FormControl('', Validators.required)
  })

  constructor(private dishesService: DishesServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.add.emit();
    this.dishesService.addDish(this.dishForm.value);
    this.dishForm.reset();
    this.router.navigate(["/list"]);
  }
}
