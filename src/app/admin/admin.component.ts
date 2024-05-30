import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AdminMenuComponent, AdminNavbarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router) {

  }

  //Vid klick på btn logout, Användare loggas ut
  logout(): void {

    localStorage.removeItem("token");
    this.router.navigate(['/login']);


  }


}
