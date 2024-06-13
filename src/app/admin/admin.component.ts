import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { AdminBtnLogoutComponent } from '../admin-btn-logout/admin-btn-logout.component';
import { MenuComponent } from '../menu/menu.component';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, AdminHeaderComponent, FontAwesomeModule, AdminBtnLogoutComponent, AdminComponent, MenuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  //Ikon
  faArrowRightToBracketIcon = faArrowRightToBracket;


  //Bakgrundsbild
  linesPatternImg: string = "/assets/img/lines-pattern.png";

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    //Kontrollerar att man fortfarande är inloggad
    this.loginService.adminAuth().subscribe({
      next: (adminResponse) => {
      },
      //Om inte loggas man ut
      error: (error) => {
        if (error.status == 403) {
          localStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      }
    });
  }


}
