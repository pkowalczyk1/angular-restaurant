import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../../dish";
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {Rating} from "../../rating";

@Component({
  selector: 'app-dish-rating',
  templateUrl: './dish-rating.component.html',
  styleUrls: ['./dish-rating.component.css']
})
export class DishRatingComponent implements OnInit {
  @Input() dish!: Dish;
  @Input() history!: string[];
  @Input() uid!: string;

  stars: number[] = [1, 2, 3, 4, 5];
  value: number = 0;

  constructor(private dishesService: DishesServiceService) { }

  ngOnInit(): void {
    if (this.dish.rating.filter(value => value.uid == this.uid).length != 0) {
      this.value = this.dish.rating.filter(value => value.uid == this.uid)[0].value;
    }
  }

  rate(star: number): void {
    if (this.history.includes(this.dish.id)) {
      this.value = star;
      if (this.dish.rating.map(value => value.uid).includes(this.uid)) {
        let currRating: Rating = this.dish.rating.filter(value => value.uid == this.uid)[0];
        let index: number = this.dish.rating.indexOf(currRating);
        currRating.value = star;
        this.dish.rating.splice(index, 1)
        this.dish.rating.push(currRating);
      }
      else {
        this.dish.rating.push({uid: this.uid, value: star});
      }

      this.dishesService.rateDish(this.dish.id, this.dish.rating);
    }
  }
}
