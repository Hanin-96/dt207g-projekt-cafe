import { Component } from '@angular/core';
import { faCalendarDays, faCircleCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  //Ikoner fontAwesome
  faClockIcon = faClock;
  faDateIcon = faCalendarDays;
  faCircleCheckIcon = faCircleCheck;

}
