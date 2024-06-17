import { Component } from '@angular/core';
import { TimeStringsComponent } from '../time-strings/time-strings.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TimeStringsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  //Hjälpkomponent för återanvändning 
  timesStringsComponent: TimeStringsComponent;

  constructor() {
    this.timesStringsComponent = new TimeStringsComponent()
  }
}
