import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';
import { CommonModule } from '@angular/common';
import { PhotoGalleryComponent } from '../photo-gallery/photo-gallery.component';
import { IntroComponent } from '../intro/intro.component';
import { AboutComponent } from '../about/about.component';
import { LocationComponent } from '../location/location.component';
import { ContactComponent } from '../contact/contact.component';
import { BookingComponent } from '../booking/booking.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PhotoGalleryComponent, IntroComponent, AboutComponent, LocationComponent, ContactComponent, BookingComponent, NavbarComponent, HeaderComponent, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    //Pattern
    patternImg: string = "../assets/img/lines-pattern.png";


  //Kallar på servicen
  constructor(private menuService: MenuService) { }


}
