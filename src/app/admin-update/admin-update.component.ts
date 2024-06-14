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
import { LoginService } from '../services/login.service';

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

  //Rätt som ska uppdateras
  dishIdToUpdate: string = "";

  //Reactive bokningsformulär
  menuForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    allergy: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(private menuService: MenuService, private loginService: LoginService, private router: Router) { }

  //Hämta menyn
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

    this.menuService.getMenuData().subscribe({
      next: (menuData) => {
        return this.dishes = menuData;
      }
    });
  }


  //Lägga till i menyn
  addMenu(): void {

    if (!this.menuForm.valid) {
      this.errorMessageMenuForm = "Ange samtliga fält!";

    } else {
      //console.log(localStorage.getItem("token"));
      this.menuService.postNewDish(this.menuForm.value as unknown as Menu).subscribe({
        next: () => {
          this.errorMessageMenuForm = "";
          this.menuForm.reset();
          this.ngOnInit();
        },
        error: (error) => {
          this.errorMessageMenuForm = "Okänt fel: Det gick inte att lägga till";
          if (error.status == 403) {
            localStorage.removeItem("token");
            this.router.navigate(['/login']);
          }
        }
      });
    }
  }

  //Ta bort maträtt från menyn
  deleteDishFromMenu(dishId: string): void {
    this.menuService.deleteFromMenu(dishId).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (error) => {
        if (error.status == 403) {
          localStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      }
    });
  }

  //Uppdatera maträtt från menyn
  updateDishFromMenu(el: HTMLElement, menuData: Menu): void {
    this.menuForm.get("title")?.setValue(menuData.title);
    this.menuForm.get("category")?.setValue(menuData.category);
    this.menuForm.get("description")?.setValue(menuData.description);
    this.menuForm.get("allergy")?.setValue(menuData.allergy);
    this.menuForm.get("price")?.setValue(menuData.price.toString());

    this.dishIdToUpdate = menuData._id;

    //Scrolla till formulär
    el.scrollIntoView({ behavior: "smooth" });
  }

  //Ångra ändring
  abortUpdate(): void {
    this.dishIdToUpdate = "";
    this.menuForm.reset();
  }

  //Uppdatera ändring av maträtt
  updateDish(): void {
    this.menuService.updateFromMenu(this.dishIdToUpdate, this.menuForm.value as unknown as Menu).subscribe({
      next: () => {
        this.ngOnInit();
        this.dishIdToUpdate = "";
        this.menuForm.reset();
      },
      error: (error) => {
        if (error.status == 403) {
          localStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      }
    });
  }

  addOrUpdateMenu() {
    if (this.dishIdToUpdate == "") {
      this.addMenu();
    } else {
      this.updateDish();
    }
  }




}
