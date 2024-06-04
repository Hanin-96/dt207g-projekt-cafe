import { Component } from '@angular/core';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-btn-logout',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './admin-btn-logout.component.html',
  styleUrl: './admin-btn-logout.component.css'
})
export class AdminBtnLogoutComponent {

  //Ikon
  faArrowRightToBracketIcon = faArrowRightToBracket;

  constructor(private router: Router) {

  }

  //Vid klick på btn logout, Användare loggas ut
  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}
