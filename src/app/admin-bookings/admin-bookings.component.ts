import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Booking } from '../models/booking';
import { BookingService } from '../services/booking.service';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { Router } from '@angular/router';
import { faCircleCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookingComponent } from '../booking/booking.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, AdminHeaderComponent, FontAwesomeModule, LoadingSpinnerComponent, BookingComponent, FooterComponent],
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

  //Spinner
  isLoading: boolean = false;

    //Ta bort vissa element i footer
    isFooter: boolean = false;

  constructor(private bookingService: BookingService, private router: Router, private loginService: LoginService) { }


  ngOnInit(): void {
    //Kontrollera om man är inloggad
    this.loginService.adminAuth().subscribe({
      next: (adminResponse) => {
      },
      //Om inte loggas man ut efter token har utgått
      error: (error) => {
        if (error.status == 403) {
          localStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      }
    });
    
    this.isLoading = true;

    //Hämta bokningar
    this.bookingService.getBookings().subscribe({
      next: (bookingData) => {
        this.isLoading = false;
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

  //Vid lyckad uppdatering av bokning, ska bookningsid reset, kalla på ngOnInit som hämtar aktuella bokningar
  updatedBookingForm(el: HTMLElement) {
    this.ngOnInit();
    this.bookingIdToUpdate = "";

    //Scrolla till bokningar
    el.scrollIntoView({ behavior: "smooth" });
  }


}
