import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  faUserIcon = faUser;
  patternImg: string = "assets/img/pattern-bg-2.png";
  cafeLogo: string = "assets/img/logotyp.svg"

  constructor(private router: Router) { }

    //Vid klick på btn logout, Användare loggas ut
    logout(): void {

      localStorage.removeItem("token");
      this.router.navigate(['/login']);
    }


}
