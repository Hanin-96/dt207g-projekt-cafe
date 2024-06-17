import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TimeStringsComponent } from '../time-strings/time-strings.component';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.css'
})
export class PhotoGalleryComponent {

  //Bilder
  imgBread: string = ("assets/img/bread.jpg");
  imgcoffee: string = ("assets/img/coffee.jpg");

  //bg-pattern
  imgPatternSquare: string = ("assets/img/pattern-bg-2.png");

  //Hjälpkomponent för återanvändning 
  timesStringsComponent: TimeStringsComponent;

  constructor() {
    this.timesStringsComponent = new TimeStringsComponent()
  }

}
