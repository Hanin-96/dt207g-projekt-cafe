import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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
