import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArrowDownScrollComponent } from '../arrow-down-scroll/arrow-down-scroll.component';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, ArrowDownScrollComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() arrowBtnEvent = new EventEmitter<void>();

  faUserIcon = faUser;
  cafeImg: string = "assets/img/cafe.jpg";
  cafeLogo: string = "assets/img/logotyp.svg"

  onArrowPress() {
    this.arrowBtnEvent.emit();

  }

 
}

