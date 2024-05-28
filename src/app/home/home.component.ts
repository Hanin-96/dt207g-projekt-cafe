import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { PhotoGalleryComponent } from '../photo-gallery/photo-gallery.component';
import { IntroComponent } from '../intro/intro.component';
import { AboutComponent } from '../about/about.component';
import { LocationComponent } from '../location/location.component';
import { ContactComponent } from '../contact/contact.component';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, PhotoGalleryComponent, IntroComponent, AboutComponent, LocationComponent, ContactComponent, BookingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  //background-pattern
  linesPatternImg: string = "/assets/img/lines-pattern.png";

  dishes: Menu[] = [];

  //Kallar på servicen
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenuData().subscribe(menuData => {
      this.dishes = menuData;
})
  }

}
