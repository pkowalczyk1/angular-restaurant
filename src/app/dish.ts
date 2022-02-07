import {Review} from "./review";
import {Rating} from "./rating";

export interface Dish {
  id: string;
  name: string;
  cuisine: string;
  type: string;
  category: string;
  ingredients: string[];
  quantity: number;
  description: string;
  price: number;
  rating: Rating[];
  photos: string[];
  reviews: Review[];
}
