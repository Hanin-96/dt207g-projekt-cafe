import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Booking } from '../models/booking';
import { BookingService } from '../services/booking.service';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, AdminHeaderComponent],
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.css'
})
export class AdminBookingsComponent {

  //Pattern
  patternImg: string = "../assets/img/lines-pattern.png"

  getBookings: Booking[] = [];

  constructor(private bookingService: BookingService, private router: Router) { }


  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next: (bookingData) => {
        this.getBookings = bookingData;

      },
      error: (error) => {
        if (error.status == 403) {
          localStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      }
    });
  }

  
}
