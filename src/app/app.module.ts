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
import { CartServiceService } from "./services/cartService/cart-service.service";
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { DishBuyComponent } from './components/dish-buy/dish-buy.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "list", component: DishListComponent},
  {path: "cart", component: DishCartComponent},
  {path: "add", component: DishFormComponent},
  {path: "details/:id", component: DishDetailsComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
];

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
    DishCartComponent,
    HomePageComponent,
    DishDetailsComponent,
    DishBuyComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [DishesServiceService, CartServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
