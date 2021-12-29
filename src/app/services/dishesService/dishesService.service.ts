import { Injectable } from '@angular/core';
import { Dish } from '../../dish';
import {Subject} from "rxjs";
import {Review} from "../../review";

@Injectable({
  providedIn: 'root'
})
export class DishesServiceService {
  dishes: Dish[] = [
    {id: 0, name: "Pizza", cuisine: "Włoska", type: "mięsny", category: "dania główne", ingredients: ["mąka", "mleko", "szynka", "ser", "sos"], quantity: 10, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 20, rating: 0, photos: ["https://media.kaufland.com/images/PPIM/AP_Content_1010/std.lang.all/79/68/Asset_817968.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Pizza_with_tomatoes.jpg/1200px-Pizza_with_tomatoes.jpg", "https://st.depositphotos.com/1003814/5052/i/950/depositphotos_50523105-stock-photo-pizza-with-tomatoes.jpg"], reviews: []},
    {id: 1, name: "Spaghetti", cuisine: "Włoska", type: "mięsny", category: "dania główne", ingredients: ["makaron", "sos", "mięso"], quantity: 20, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 5.20, rating: 0, photos: ["https://www.pyszne.pl/foodwiki/uploads/sites/7/2018/03/spaghetti.jpg", "https://www.mojegotowanie.pl/media/cache/big/uploads/media/default/0001/76/9a2463d45a9f7107bef30529f395814c9cd89463.jpeg", "https://ocdn.eu/pulscms-transforms/1/5DTk9kpTURBXy8wYTQ2YmY1M2NlYTVlMTM2NWU2MjdiMmRjODExZTUxZi5qcGeTlQMAH80D6M0CMpMFzQMUzQG8kwmmMDY1MzNiBoGhMAE/spaghetti-puttanesca.jpg"], reviews: []},
    {id: 2, name: "Żurek", cuisine: "Polska", type: "mięsny", category: "zupy", ingredients: ["zakwas", "kiełbasa", "ziemniaki"], quantity: 5, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 3.10, rating: 0, photos: ["https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/zurek_01_1.jpg", "https://d3iamf8ydd24h9.cloudfront.net/pictures/articles/2018/02/39528-v-900x556.jpg", "https://www.zajadam.pl/wp-content/uploads/2014/07/zurek-przepis-2.jpg"], reviews: []},
    {id: 3, name: "Burger", cuisine: "amerykańska", type: "mięsny", category: "dania główne", ingredients: ["bułka", "mięso", "sos", "sałata"], quantity: 6, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 5, rating: 0, photos: ["https://www.unileverfoodsolutions.pl/dam/global-ufs/mcos/nee/poland/recipe/italian-burger/wloski-burger_1611135467.jpg", "https://cdn.galleries.smcloud.net/t/galleries/gf-fCGi-H1PR-KYKb_amerykanski-burger-z-francuskim-sosem-jak-zrobic-664x442-nocrop.jpg", "https://www.unileverfoodsolutions.pl/dam/global-ufs/mcos/NEE/calcmenu/recipes/PL-recipes/sandwiches/burger-francuski-z-kozim-serem-marmolad%C4%85-z-czerwonej-cebuli-i-rukol%C4%85/main-header.jpg"], reviews: []},
    {id: 4, name: "kotlet schabowy", cuisine: "polska", type: "mięsny", category: "dania główne", ingredients: ["mięso", "ziemniaki", "surówka"], quantity: 15, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 6.2, rating: 0, photos: ["https://przepisna.pl/file/2019/11/kotlet-schabowy-800x477.jpg", "https://static.smaker.pl/photos/9/7/8/978ad5083bcc00e02333838e397c9cae_351293_5c83f580e719e_wm.jpg", "https://pieprzyczfantazja.pl/wp-content/uploads/2020/06/PicsArt_06-07-01.54.49-scaled-e1591532005853.jpg"], reviews: []},
    {id: 5, name: "jajecznica", cuisine: "międzynarodowa", type: "mięsny", category: "śniadania", ingredients: ["jajka", "boczek", "masło"], quantity: 13, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 3, rating: 0, photos: ["https://www.mojegotowanie.pl/media/cache/default_medium/uploads/media/recipe/0002/11/jajecznica-z-mlekiem.jpeg", "https://ohme.pl/portal/wp-content/uploads/2020/07/iStock-986831396-e1594638534785-760x427.jpg", "https://kulinarneprzeboje.pl/wp-content/uploads/2020/04/jajecznica.jpg"], reviews: []},
    {id: 6, name: "kurczak curry", cuisine: "indyjska", type: "mięsny", category: "dania główne", ingredients: ["kurczak", "sos curry", "ryż"], quantity: 10, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 6, rating: 0, photos: ["https://cdn.aniagotuje.com/pictures/articles/2020/01/1967550-v-1500x1500.jpg", "https://polki.pl/foto/4_3_LARGE/kurczak-w-sosie-curry-ze-smietana-przepis-na-obiad-w-20-minut-2448557.jpg", "https://cookingmadehealthy.com/wp-content/uploads/2019/01/Indian-Curry-Chicken-2.jpg"], reviews: []},
    {id: 7, name: "sushi", cuisine: "japońska", type: "wegetariański", category: "kolacje", ingredients: ["ryba", "ryż"], quantity: 4, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 10, rating: 0, photos: ["https://praktykulinarni.com/wp-content/uploads/2021/06/jak-zrobic-wege-sushi-1024x683.jpg", "https://posbistro-safe-blog.s3.eu-west-1.amazonaws.com/up/2014/10/15154418/riccardo-bergamini-O2yNzXdqOu0-unsplash.jpg", "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/8DB99814-683D-40AA-9A35-82EAB8134ED2/Derivates/DFA83A24-ADD3-4E86-AAAE-62C609D07667.jpg"], reviews: []},
    {id: 8, name: "lasagne", cuisine: "włoska", type: "mięsny", category: "dania główne", ingredients: ["makaron", "sos", "mięso"], quantity: 7, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 13.70, rating: 0, photos: ["https://www.mojegotowanie.pl/media/cache/default_medium/uploads/media/recipe/0002/02/lasagne-z-sosem-beszamelowym.jpeg", "https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/lasagne_bolognese_01.jpg", "https://s.mamotoja.pl/i/lasagne-z-miesem-mielonym-BIG-92138.jpg"], reviews: []},
    {id: 9, name: "zupa z ciecierzycy", cuisine: "egipska", type: "wegański", category: "zupy", ingredients: ["ciecierzyca", "przyprawy"], quantity: 15, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 10, rating: 0, photos: ["https://www.zajadam.pl/wp-content/uploads/2015/02/zupa-ciecierzyca-3.jpg", "https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/zupa_z_ciecierzycy_01.jpg", "https://madameedith.com/wp-content/uploads/2017/08/zupa-z-cieciezycy-7.jpg"], reviews: []},
    {id: 10, name: "panini", cuisine: "włoska", type: "mięsny", category: "śniadania", ingredients: ["chleb", "kurczak", "ser"], quantity: 40, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 7.84, rating: 0, photos: ["https://www.mojegotowanie.pl/media/cache/default_view/uploads/media/recipe/0002/19/panini-salami.jpeg", "https://ocdn.eu/pulscms-transforms/1/RWXk9kpTURBXy9kMGQ1YjExZTkzYzZjYWQxYjlhOWY4YThhY2U5MmQwYS5qcGeTlQMAJ80E5s0CwZMFzQMUzQG8kwmmYjBmMjkzBoGhMAE/panini-z-kurczakiem.jpg"], reviews: []},
    {id: 11, name: "zupa pomidorowa", cuisine: "polska", type: "wegański", category: "zupy", ingredients: ["przecier pomidorowy", "pomidory", "przyprawy"], quantity: 30, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.", price: 8.38, rating: 0, photos: ["https://ocdn.eu/pulscms-transforms/1/0vTk9kqTURBXy8wOWUzNTJhMWIwMGYxNWU2M2IxNjgzZTFhZDliODlmMy5qcGVnk5UDADTNBpjNA7WTBc0DFM0BvJMJpjllMmQ0NwaBoTAB/zupa-pomidorowa.jpg", "https://cdn.aniagotuje.com/pictures/articles/2021/10/20290189-v-1500x1500.jpg", "https://s3.gotujmy.pl/newsy/przepis-na-zupe-pomidorowa-bez-koncentratu-4794-4_3.jpg"], reviews: []}
  ]
  currId = 12;
  totalQuantity: number = 0;
  currQuantities: Map<Dish, number> = new Map<Dish, number>();
  currency: string = "dollar";
  maxPrice: number;
  minPrice: number;
  maxPriceSubject: Subject<number>;
  minPriceSubject: Subject<number>;
  maxDish: Dish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
  minDish: Dish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? current : prev);
  currencyRatio: number = 1;
  filterMinPrice: number;
  filterMaxPrice: number;
  filterTypes: string[] = [];
  filterCategories: string[] = [];
  filterRating: number[] = [0, 1, 2, 3, 4, 5];
  categories: string[] = [];
  types: string[] = [];

  constructor() {
    this.maxPrice = this.maxDish.price;
    this.minPrice = this.minDish.price;
    this.maxPriceSubject = new Subject<number>();
    this.minPriceSubject = new Subject<number>();
    this.filterMaxPrice = this.maxPrice;
    this.filterMinPrice = this.minPrice;
    for (let dish of this.dishes) {
      if (!this.filterTypes.includes(dish.type)) {
        this.filterTypes.push(dish.type);
        this.types.push(dish.type);
      }
      if (!this.filterCategories.includes(dish.category)) {
        this.filterCategories.push(dish.category);
        this.categories.push(dish.category);
      }
    }
    for (let dish of this.dishes) {
      this.currQuantities.set(dish, dish.quantity);
    }
  }

  increaseQuantity(i: number): void {
    this.totalQuantity += i;
  }

  decreaseQuantity(i: number): void {
    this.totalQuantity -= i;
  }

  remove(dish: Dish): void {
    let index: number = this.dishes.indexOf(dish);
    this.dishes.splice(index, 1);
    this.currQuantities.delete(dish);
    if (dish == this.maxDish && this.dishes.length != 0) {
      this.maxDish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
    }
    if (dish == this.minDish && this.dishes.length != 0) {
      this.minDish = this.dishes.reduce((prev, current) => (prev.price < current.price) ? prev : current);
    }

    if (this.minDish.price > this.minPrice) {
      this.minPrice = this.minDish.price;
      this.minPriceSubject.next(this.minPrice);
      this.filterMinPrice = this.minPrice;
    }
    if (this.maxDish.price < this.maxPrice) {
      this.maxPrice = this.maxDish.price;
      this.maxPriceSubject.next(this.maxPrice);
      this.filterMaxPrice = this.maxPrice;
    }

    let oldCategories: string[] = this.categories;
    let oldTypes: string[] = this.types;
    this.categories = [];
    this.types = [];
    for (let dish of this.dishes) {
      if (!this.categories.includes(dish.category)) {
        this.categories.push(dish.category);
      }
      if (!this.types.includes(dish.type)) {
        this.types.push(dish.type);
      }
    }

    if (oldCategories.length > this.categories.length) {
      this.filterCategories = this.categories;
    }
    if (oldTypes.length > this.types.length) {
      this.filterTypes = this.types;
    }
  }

  addDish(newDish: any): void {
    let dish: Dish = {
      id: this.currId,
      name: newDish.name,
      cuisine: newDish.cuisine,
      type: newDish.type,
      category: newDish.category,
      ingredients: newDish.ingredients.split(","),
      quantity: parseInt(newDish.quantity),
      description: newDish.description,
      price: parseFloat(newDish.price),
      rating: 0,
      photos: newDish.photos.split(","),
      reviews: [],
    };
    this.currId++;
    this.dishes.push(dish);
    this.currQuantities.set(dish, dish.quantity);
    this.maxDish = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current);
    this.minDish = this.dishes.reduce((prev, current) => (prev.price < current.price) ? prev : current);
    if (this.maxDish.price > this.maxPrice) {
      this.maxPrice = this.maxDish.price;
      this.maxPriceSubject.next(this.maxPrice);
      this.filterMaxPrice = this.maxPrice;
    }
    if (this.minDish.price < this.minPrice) {
      this.minPrice = this.minDish.price;
      this.minPriceSubject.next(this.minPrice);
      this.filterMinPrice = this.minPrice;
    }

    let oldCategories: string[] = this.categories;
    let oldTypes: string[] = this.types;
    this.categories = [];
    this.types = [];
    for (let dish of this.dishes) {
      if (!this.categories.includes(dish.category)) {
        this.categories.push(dish.category);
      }
      if (!this.types.includes(dish.type)) {
        this.types.push(dish.type);
      }
    }

    if (oldCategories.length < this.categories.length) {
      this.filterCategories = this.categories;
    }
    if (oldTypes.length < this.types.length) {
      this.filterTypes = this.types;
    }
  }

  increaseCurrQuantity(dish: Dish): void {
    // @ts-ignore
    let tmp: number = this.currQuantities.get(dish);
    this.currQuantities.set(dish, tmp + 1);
  }

  decreaseCurrQuantity(dish: Dish): void {
    // @ts-ignore
    let tmp: number = this.currQuantities.get(dish);
    this.currQuantities.set(dish, tmp - 1);
  }

  changeCurrency(): void {
    if (this.currencyRatio == 1) {
      this.currencyRatio = 0.88;
      this.currency = "euro";
    }
    else {
      this.currencyRatio = 1;
      this.currency = "dollar";
    }
  }

  changeFilters(minPrice: number, maxPrice: number, types: string[], categories: string[], rating: number[]) {
    this.filterMinPrice = minPrice;
    this.filterMaxPrice = maxPrice;
    this.filterTypes = types;
    this.filterCategories = categories;
    this.filterRating = rating;
  }

  changeRating(dish: Dish, star: number) {
    for (let obj of this.dishes) {
      if (obj == dish) {
        obj.rating = star;
        break;
      }
    }
  }

  getDishById(id: number): Dish {
    return this.dishes.filter(o => o.id == id)[0];
  }

  getTotalQuantity(): number {
    return this.totalQuantity;
  }

  getCurrency(): string {
    return this.currency;
  }

  getDishes(): Dish[] {
    return this.dishes;
  }

  getMaxDish(): Dish {
    return this.maxDish;
  }

  getMinDish(): Dish {
    return this.minDish;
  }

  getCurrQuantity(dish: Dish): number {
    // @ts-ignore
    return this.currQuantities.get(dish);
  }

  addReview(dish: Dish, newReview: any) {
    let review: Review = {
      owner: newReview.nick,
      title: newReview.title,
      text: newReview.text,
      date: newReview.date,
    };
    dish.reviews.push(review);
  }
}
