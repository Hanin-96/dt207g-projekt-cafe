import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loginresponse } from '../models/loginresponse';
import { AdminResponse } from '../models/admin-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/login";

  private adminUrl: string = "https://dt207g-cafe-lugnet-webbtjanst.onrender.com/admin";

  constructor(private http: HttpClient) { }

  //Admin inloggning
  login(username: string, password: string): Observable<Loginresponse> {
    return this.http.post<Loginresponse>(this.url, {username, password});
  }

  //Admin authentication
  adminAuth(): Observable<AdminResponse> {

      //Hämta token
      const token = localStorage.getItem("token");
      const headers = { Authorization: "Bearer " + token };

    return this.http.get<AdminResponse>(this.adminUrl, {headers});
  }
}
