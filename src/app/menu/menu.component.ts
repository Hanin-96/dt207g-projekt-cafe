import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  dishes: Menu[] = [];

  //Spinner
  isLoading: boolean = false;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    //Loading spinner sätts igång vid hämtning av data ifall det dröjer
    this.isLoading = true; 
    this.menuService.getMenuData().subscribe(menuData => {
      this.dishes = menuData;
      //Loading spinner sätts till false om data har hämtats
      this.isLoading = false;
    })
  }

}
