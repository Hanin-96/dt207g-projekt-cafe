import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FontAwesomeModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  //Ikoner
  faBarsIcon = faBars;
  faXMarkIcon = faXmark;

  isMenuActivated: boolean = false;

  //Toggla
  menuToggle(): void {
    this.isMenuActivated = !this.isMenuActivated;
  }

  //Stänga menyn
  closeMenu(): void {
    this.isMenuActivated = false;
  }

}
