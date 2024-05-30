import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {


  private url: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/booking";

  constructor(private http: HttpClient) { }

  //Admin inloggning
  postBooking(booking: Booking): Observable<Booking> {

    return this.http.post<Booking>(this.url, booking);
  }
}
