import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {


  private url: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/booking";

  private getUrl: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/booking/list";

  private putUrl: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/booking/:bookingId";

  constructor(private http: HttpClient) { }

  //Göra bordbokningar, public för besökare
  postBooking(booking: Booking): Observable<Booking> {

    return this.http.post<Booking>(this.url, booking);
  }

  //Hämta bokningar i Admin
  getBookings(): Observable<Booking[]> {

    //Hämta token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.get<Booking[]>(this.getUrl, {headers});
  }

  PutBooking(updateBooking: Booking): Observable<Booking> {

    //Token för ändring av bokningar
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.put<Booking>(this.putUrl, updateBooking, {headers})
  }
}
