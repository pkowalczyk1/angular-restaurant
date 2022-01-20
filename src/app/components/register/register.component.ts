import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../services/authService/auth-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email!: string;
  username!: string;
  password!: string;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.createUser(this.email, this.password, this.username);
  }
}
