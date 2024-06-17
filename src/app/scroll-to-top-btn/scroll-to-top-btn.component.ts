import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll-to-top-btn',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './scroll-to-top-btn.component.html',
  styleUrl: './scroll-to-top-btn.component.css'
})
export class ScrollToTopBtnComponent {

  btnIsVisible: boolean = false;
  
  //arrow icon 
  faChevronUpIcon = faChevronUp;

  //Knappen blir synlig efter 600px scroll
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.btnIsVisible = window.scrollY > 600;
  }
  //Scrolla till toppen
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
