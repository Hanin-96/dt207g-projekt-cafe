import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  dishes: Menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenuData().subscribe(menuData => {
      this.dishes = menuData;
    })
  }

}
