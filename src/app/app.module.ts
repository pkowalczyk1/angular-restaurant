import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { DishesServiceService } from './services/dishesService/dishesService.service';
import { DishComponentComponent } from './components/dish-component/dish-component.component';
import { HeaderComponent } from './components/header/header.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard} from "./guard/auth.guard";
import { DishUpdateComponent } from './components/dish-update/dish-update.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "list", component: DishListComponent},
  {path: "cart", component: DishCartComponent, canActivate: [AuthGuard]},
  {path: "details/:id", component: DishDetailsComponent, canActivate: [AuthGuard]},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "update/:id", component: DishUpdateComponent},
  {path: "admin-list", component: AdminListComponent},
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
    RegisterComponent,
    LoginComponent,
    DishUpdateComponent,
    AdminListComponent,
    UsersListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [DishesServiceService, CartServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
