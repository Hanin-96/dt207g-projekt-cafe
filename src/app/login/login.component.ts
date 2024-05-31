import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Loginresponse } from '../models/loginresponse';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  //Error message
  errorMessage: string = "";

  //Ikon
  faUserIcon = faUser;
  faChevronIcon = faChevronLeft;

  constructor(private loginService: LoginService, private router: Router) { }

  //Img pattern
  patternImg: string = "/assets/img/pattern-bg-2.png"

  //Logotyp
  cafeLogo: string = "assets/img/logotyp.svg"

  //Inloggning
  login(): void {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response: Loginresponse) => {
        //Spara token i LocalStorage
        localStorage.setItem("token", response.token);
        this.router.navigate(['/admin']);

        console.log(response.message);
      },
      error: (error) => {
        this.errorMessage = "Felaktig Användarnamn / Lösenord";
      },
    });
  }

  backToStartBtn(): void {
    this.router.navigate(['/']);
  }

}
