import { Component, Input } from '@angular/core';
import { TimeStringsComponent } from '../time-strings/time-strings.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TimeStringsComponent, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  @Input() isFooterVisible: boolean = true;

  //Hjälpkomponent för återanvändning 
  timesStringsComponent: TimeStringsComponent;

  constructor() {
    this.timesStringsComponent = new TimeStringsComponent()
  }
}
