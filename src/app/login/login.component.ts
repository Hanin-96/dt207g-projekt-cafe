import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Loginresponse } from '../models/loginresponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private loginService: LoginService, router: Router) { }

  //Inloggning

  login(): void {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response: Loginresponse) => {
        console.log(response.message);
      },
      error: (error) => {
        console.log("Felaktig inloggning");
      }
    });
  }

}
