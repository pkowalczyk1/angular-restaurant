import { Component, OnInit } from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";
import {AuthServiceService} from "../../services/authService/auth-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dishesService: DishesServiceService, public authService: AuthServiceService) {
  }

  ngOnInit(): void {
  }

  changeValue(): void {
    this.dishesService.changeCurrency();
  }
}
