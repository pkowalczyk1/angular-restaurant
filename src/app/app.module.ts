import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishesServiceService } from './dishesService/dishesService.service';
import { DishComponentComponent } from './dish-component/dish-component.component';
import { HeaderComponent } from './header/header.component';
import { DishFormComponent } from './dish-form/dish-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    DishComponentComponent,
    HeaderComponent,
    DishFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [DishesServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
