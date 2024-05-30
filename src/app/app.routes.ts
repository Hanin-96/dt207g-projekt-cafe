import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './services/auth.guard';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "admin", component: AdminComponent, canActivate: [authGuard]},
    { path: "uppdatera", component: AdminUpdateComponent, canActivate: [authGuard]},
    { path: "bokningar", component: AdminBookingsComponent, canActivate: [authGuard]},
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
