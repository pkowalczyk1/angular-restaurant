import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../services/authService/auth-service.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(public authService: AuthServiceService) { }

  ngOnInit(): void {
  }

}
