import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faCalendarDays, faCircleCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  //Ikoner fontAwesome
  faClockIcon = faClock;
  faDateIcon = faCalendarDays;
  faCircleCheckIcon = faCircleCheck;

  //Error
  errorMessageForm: string = "";

  //Bokningsbekräftelse
  bookingSuccessMessage: string = "";
  bookingSuccessName: string = "";
  bookingSuccessDateTime: string = "";
  bookingSuccessGuests: string = "";

  //Input variabler
  @Input() bookingId: string = "";

  //Input för backgrund
  @Input() useBackground: boolean = true;

  //Display text endast för kund
  @Input() displaySuccessMessage: boolean = true;

  //Output 
  @Output() updateEvent = new EventEmitter<Booking>();


  //Reactive bokningsformulär
  bookingForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phonenumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    guests: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    bookingMessage: new FormControl('')
  });

  constructor(private bookingService: BookingService, private router: Router) { }

  //Lägg till bokning i databas
  addBooking(): void {
    //validering av input i fälten
    if (!this.bookingForm.valid) {
      this.errorMessageForm = "Ange samtliga fält!";

    } else {
      //Vid lyckat post sparas datan 
      this.bookingService.postBooking(this.bookingForm.value as unknown as Booking).subscribe({
        next: () => {
          if (this.displaySuccessMessage == true) {

            this.bookingSuccessMessage = "Bokningsbekräftelse: Vi har tagit emot din bokning";
            this.bookingSuccessName = this.bookingForm.value.firstname + " " + this.bookingForm.value.lastname;
            this.bookingSuccessDateTime = this.bookingForm.value.date + " kl:" + this.bookingForm.value.time;
            this.bookingSuccessGuests = this.bookingForm.value.guests + "";
          }
          this.bookingForm.reset();
          this.errorMessageForm = "";
          this.addUpdatedBooking();

        },
        error: (error) => {
          this.errorMessageForm = error;
          if (error.status == 403) { 
            localStorage.removeItem("token");
            this.router.navigate(['/login']);
          }
        }
      })
    }
  }

  bookingConfirmBtn(): void {
    this.bookingSuccessMessage = "";
    this.bookingSuccessName = "";
    this.bookingSuccessDateTime = "";
    this.bookingSuccessGuests = "";
  }

  //Fylla input med tidigare bokning
  populateBookingFromBooking(booking: Booking): void {
    this.bookingForm.get("firstname")?.setValue(booking.firstname);
    this.bookingForm.get("lastname")?.setValue(booking.lastname);
    this.bookingForm.get("phonenumber")?.setValue(booking.phonenumber);
    this.bookingForm.get("email")?.setValue(booking.email);
    this.bookingForm.get("guests")?.setValue(booking.guests.toString());
    this.bookingForm.get("date")?.setValue(booking.date);
    this.bookingForm.get("time")?.setValue(booking.time);
    this.bookingForm.get("bookingMessage")?.setValue(booking.bookingMessage);
  }

  abortUpdate(): void {
    this.bookingId = "";
    this.bookingForm.reset();
  }

  //Uppdatera bokning
  updateBooking(): void {
    this.bookingService.updateBooking(this.bookingId, this.bookingForm.value as unknown as Booking).subscribe({
      next: () => {
        this.bookingId = "";
        this.bookingForm.reset();
        this.addUpdatedBooking();
      },
      error: (error) => {
        if (error.status == 403) {
          localStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      }
    });
  }

  //Vid uppdatering eller ny bokning, updateras som output och skickar event
  addUpdatedBooking() {
    this.updateEvent.emit();
  }

  //Om bokningsId är tomt då ska ny bokning funktion kallas annars uppdateras existerande
  addOrUpdateBooking(): void {
    if (this.bookingId == "") {
      this.addBooking();
    } else {
      this.updateBooking();
    }
  }
}


