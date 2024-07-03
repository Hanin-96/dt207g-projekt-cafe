import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-arrow-down-scroll',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './arrow-down-scroll.component.html',
  styleUrl: './arrow-down-scroll.component.css'
})
export class ArrowDownScrollComponent {
  faChevronDown = faChevronDown;

}
