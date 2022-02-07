import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../user";
import {AuthServiceService} from "../../services/authService/auth-service.service";

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  @Input() user!: User;

  constructor(public authService: AuthServiceService) { }

  ngOnInit(): void {
  }

}
