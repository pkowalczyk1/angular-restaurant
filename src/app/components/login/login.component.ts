import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../services/authService/auth-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(public authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password);
  }
}
