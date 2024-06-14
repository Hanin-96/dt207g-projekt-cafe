import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Booking } from '../models/booking';
import { BookingService } from '../services/booking.service';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { Router } from '@angular/router';
import { AdminBtnLogoutComponent } from '../admin-btn-logout/admin-btn-logout.component';
import { faCircleCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, AdminHeaderComponent, AdminBtnLogoutComponent, FontAwesomeModule, BookingComponent],
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.css'
})
export class AdminBookingsComponent {

  //Pattern
  patternImg: string = "../assets/img/lines-pattern.png";

  getBookings: Booking[] = [];

  //Bokning som ska uppdateras
  bookingIdToUpdate: string = "";

  //Ikon
  faCircleCheckIcon = faCircleCheck;
  faTrashIcon = faTrash;
  faPenIcon = faPenToSquare;



  constructor(private bookingService: BookingService, private router: Router) { }


  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next: (bookingData) => {
        this.getBookings = bookingData.sort((a, b) => {
          //Returnera efter tidigast bokningstider
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

      },
      error: (error) => {
        if (error.status == 403) {
          //Tar bort token och man loggas ut
          localStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      }
    });
  }

  //Ta bort bokning
  deleteBooking(bookingId: string): void {
    this.bookingService.deleteFromBooking(bookingId).subscribe({
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

  //Uppdatera bokning
  updateBooking(el: HTMLElement, booking: Booking, bookingComponent: BookingComponent): void {
    //Hämtat bokningsId
    this.bookingIdToUpdate = booking._id;

    bookingComponent.populateBookingFromBooking(booking);
    el.scrollIntoView({ behavior: "smooth" });

  }

  updatedBooking(el: HTMLElement) {
    this.ngOnInit();
    this.bookingIdToUpdate = "";
    el.scrollIntoView({ behavior: "smooth" });

  }


}
