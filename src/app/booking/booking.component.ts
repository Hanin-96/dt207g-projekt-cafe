import { Component } from '@angular/core';
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

  constructor(private addBokingService: BookingService, private router:Router) { }

  //Lägg till bokning i databas
  addBooking(): void {
    //validering av input i fälten
    if (!this.bookingForm.valid) {
      this.errorMessageForm = "Ange samtliga fält!";

    } else {
      //Vid lyckat post sparas datan 
      this.addBokingService.postBooking(this.bookingForm.value as unknown as Booking).subscribe({
        next: () => {
          this.bookingSuccessMessage = "Bokningsbekräftelse: Vi har tagit emot din bokning";
          this.bookingSuccessName = this.bookingForm.value.firstname + " " + this.bookingForm.value.lastname;
          this.bookingSuccessDateTime = this.bookingForm.value.date + " kl:" + this.bookingForm.value.time;
          this.bookingSuccessGuests = this.bookingForm.value.guests + "";
          this.bookingForm.reset();
          this.errorMessageForm = "";

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


}
