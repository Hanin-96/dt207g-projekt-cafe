import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';
import { AdminBtnLogoutComponent } from '../admin-btn-logout/admin-btn-logout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';
import { faCircleCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-update',
  standalone: true,
  imports: [AdminHeaderComponent, AdminNavbarComponent, CommonModule, AdminBtnLogoutComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css'
})
export class AdminUpdateComponent {

  //Ikon
  faCircleCheckIcon = faCircleCheck;
  faTrashIcon = faTrash;
  faPenIcon = faPenToSquare;

  //Bakgrundsbild
  linesPatternImg: string = "/assets/img/lines-pattern.png";

  //Error
  errorMessageMenuForm: string = "";

  //Typen Menu interface
  dishes: Menu[] = [];

  //Reactive bokningsformulär
  menuForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    allergy: new FormControl(''),
    price: new FormControl('', Validators.required)
  });

  constructor(private addmenuService: MenuService, private router: Router, private menuService: MenuService) { }

  //Hämta menyn
  ngOnInit(): void {
    this.menuService.getMenuData().subscribe(menuData => {
      this.dishes = menuData;
    })
  }

  //Lägga till i menyn
  addMenu(): void {

    if (!this.menuForm.valid) {
      this.errorMessageMenuForm = "Ange samtliga fält!";

    } else {
      console.log(localStorage.getItem("token"));
      this.addmenuService.postNewDish(this.menuForm.value as unknown as Menu).subscribe({
        next: () => {
          this.errorMessageMenuForm = "";
          this.menuForm.reset();
          this.ngOnInit();
        },
        error: (error) => {
          this.errorMessageMenuForm = error.error;
          if (error.status == 403) {
            localStorage.removeItem("token");
            this.router.navigate(['/login']);
          }
        }
      });
    }
  }







}
