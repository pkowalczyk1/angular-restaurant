import { Component, OnInit } from '@angular/core';
import {DishesServiceService} from "../../services/dishesService/dishesService.service";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  constructor(public dishesService: DishesServiceService) { }

  ngOnInit(): void {
  }

}
