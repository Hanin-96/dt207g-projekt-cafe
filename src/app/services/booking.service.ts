import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';
import { DefaultResponse } from '../models/default-response';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  //Api url REST
  private url: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/booking";

  private getUrl: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/booking/list";

  private putUrl: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/booking/";

  private deleteUrl: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/booking/"

  constructor(private http: HttpClient) { }

  //Göra bordbokningar, public för besökare
  postBooking(booking: Booking): Observable<Booking> {

    return this.http.post<Booking>(this.url, booking);
  }

  //Hämta bokningar i Admin
  getBookings(): Observable<Booking[]> {

    //Hämta token
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    return this.http.get<Booking[]>(this.getUrl, { headers });
  }

  //Uppdatera bokning
  updateBooking(bookingId: string, updatedBooking: Booking): Observable<Booking> {

    //Token för ändring av bokningar
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    return this.http.put<Booking>(this.putUrl + bookingId, updatedBooking, { headers });
  }

  //Ta bort bokning
  deleteFromBooking(bookingId: string): Observable<DefaultResponse> {

    //Token för radering av maträtter
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    return this.http.delete<DefaultResponse>(this.deleteUrl + bookingId, { headers });
  }
}
