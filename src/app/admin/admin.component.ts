import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { AdminBtnLogoutComponent } from '../admin-btn-logout/admin-btn-logout.component';
import { MenuComponent } from '../menu/menu.component';


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


}
