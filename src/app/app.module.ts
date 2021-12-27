import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { DishesServiceService } from './services/dishesService/dishesService.service';
import { DishComponentComponent } from './components/dish-component/dish-component.component';
import { HeaderComponent } from './components/header/header.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DishRatingComponent } from './components/dish-rating/dish-rating.component';
import { DishesFilterPipe } from './pipes/dishes-filter/dishes-filter.pipe';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { DishCartComponent } from './components/dish-cart/dish-cart.component';
import {CartServiceService} from "./services/cartService/cart-service.service";

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    DishComponentComponent,
    HeaderComponent,
    DishFormComponent,
    DishRatingComponent,
    DishesFilterPipe,
    FilterFormComponent,
    DishCartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [DishesServiceService, CartServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
