import { Component } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.css'
})
export class PhotoGalleryComponent {

  imgBread: string = ("assets/img/bread.jpg");
  imgcoffee: string = ("assets/img/coffee.jpg");

  timeWeekday: string = "Mån - Fre: 10:00-18:00";
  timeWeekend: string = "Lör - Sön: 10:00-17:00";
  timeLunch: string = "Lunch: 11:00-14:00";

}
