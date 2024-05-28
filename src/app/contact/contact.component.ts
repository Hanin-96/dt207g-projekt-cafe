import { Component } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  //Ikoner fontAwesome
  faPhoneIcon = faPhone;
  faEpostIcon = faEnvelope;
  faLocationIcon = faLocationDot;

}
