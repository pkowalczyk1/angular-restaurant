import {Review} from "./review";

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
  rating: number;
  photos: string[];
  reviews: Review[];
}
