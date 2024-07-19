import { Component } from '@angular/core';

@Component({
  selector: 'app-time-strings',
  standalone: true,
  imports: [],
  templateUrl: './time-strings.component.html',
  styleUrl: './time-strings.component.css'
})
export class TimeStringsComponent {
  timeWeekday: string = "Mån - Fre: 10:00-18:00";
  timeWeekend: string = "Lör - Sön: 10:00-17:00";
  timeLunch: string = "Lunch: 11:00-15:00";

}
